import { Router } from 'express';
// Updated to use Cloudinary instead of Google Cloud Storage
import uploadFileToGCS from '../utils/googleCloud.js'
import CommunityPost from '../models/Community.js';
import upload from '../middleware/upload.js';
const communityRoute=Router()
import yup from 'yup'

 const communityPostValidation = yup.object().shape({
  text: yup.string().trim().nullable(),
  privacy: yup.string().oneOf(['Private', 'Public']).required(),
  region: yup.string().oneOf(['Region', 'Global']).required(),
  media: yup.array().of(
    yup.object().shape({
      type: yup.string().oneOf(['image', 'video']).required(),
      url: yup.string().url().required(),
    })
  ).nullable(),

}).test(
  'text-or-media-required',
  'Please provide at least text or media.',
  function (value: unknown) {
    const hasText = Boolean((value as { text?: string })?.text?.trim());
    const hasMedia = Boolean((value as { media?: unknown[] })?.media?.length);
    return hasText || hasMedia;
  }
);

    communityRoute.post('/', upload.array('media'), async (req, res) => {
  try {
    const { text = '', privacy, region } = req.body;
    const files = (req.files as Express.Multer.File[]) || [];

    // Check if Cloudinary is configured by looking for path property
    const isCloudinaryUpload = files.length > 0 && files[0] && (files[0] as any).path;
    
    let media;
    if (isCloudinaryUpload) {
      // With Cloudinary storage, files are already uploaded and URLs are available
      media = files.map((file: Express.Multer.File) => {
        const url = (file as any).path; // Cloudinary provides the URL in the path property
        const type = file.mimetype.startsWith('video') ? 'video' : 'image';
        return { type, url };
      });
    } else {
      // With memory storage, upload to Cloudinary manually
      media = await Promise.all(
        files.map(async (file: Express.Multer.File) => {
          const url = await uploadFileToGCS(file);
          const type = file.mimetype.startsWith('video') ? 'video' : 'image';
          return { type, url };
        })
      );
    }

    const parsedBody = {
      text,
      privacy,
      region,
      media,
    };

    await communityPostValidation.validate(parsedBody);

    const post = new CommunityPost({
      text,
      privacy,
      region,
      media,
      dealerId: (req as { user?: { _id: string } }).user?._id,
    });

    await post.save();
    res.status(201).json({ success: true, post });

  } catch (err: unknown) {
    
    res.status(400).json({
      success: false,
      message: (err as Error).message || 'Upload failed.',
    });
  }
});


// communityRoute.get('/', async (req, res) => {
//   try {
//     const page = parseInt((req.query.page as string) || '1');
//     const limit = parseInt((req.query.limit as string) || '5');
//     const search = ((req.query.searchTerm as string) || '').trim() || '';
//     const skip = (page - 1) * limit;

//      const searchFilter = search
//       ? {
//           $or: [
//             { title: { $regex: search, $options: 'i' } },
//             { description: { $regex: search, $options: 'i' } },
//           ],
//         }
//       : {};

//      let posts = await CommunityPost.find()
//       .sort({ createdAt: -1 })
//       .skip(skip)
//       .limit(limit * 2)  
//       .populate('dealerId', 'name fullName email')
//       .populate('car');

//      if (search) {
//       const searchRegex = new RegExp(search, 'i');
     
//       posts = posts.filter((post) => {
//         const car = post.car;
//         const matchesCarTitle = (car as { title?: string })?.title?.match(searchRegex);
//         const matchesCarModal = (car as { modal?: unknown })?.modal?.toString()?.match(searchRegex) || false;
//         const matchesCarYear = (car as { year?: unknown })?.year?.toString()?.match(searchRegex) || false;

//         return matchesCarTitle || matchesCarModal || matchesCarYear;
//       });
//     }

//      await Promise.all(
//       posts.map((post) =>
//         CommunityPost.findByIdAndUpdate(post._id, { $inc: { views: 1 } }).exec()
//       )
//     );

//     const totalCount = await CommunityPost.countDocuments(searchFilter);
//     const hasMore = skip + posts.length < totalCount;
//     const paginatedPosts = posts.slice(0, limit);

//     res.json({
//       posts: paginatedPosts,
//       hasMore,
//     });
//   } catch {
    
//     res.status(500).json({ message: 'Internal server error' });
//   }
// });

communityRoute.get('/', async (req, res) => {
  try {
    const page = parseInt((req.query.page as string) || '1', 10);
    const limit = parseInt((req.query.limit as string) || '10', 10);
    const search = ((req.query.searchTerm as string) || '').trim();
    const skip = (page - 1) * limit;

    // Search filter
    const searchFilter = search
      ? {
          $or: [
            { text: { $regex: search, $options: 'i' } },
            { privacy: { $regex: search, $options: 'i' } },
            { region: { $regex: search, $options: 'i' } },
          ],
        }
      : {};

    // Count total
    const totalCount = await CommunityPost.countDocuments(searchFilter);

    // Fetch posts
    const posts = await CommunityPost.find(searchFilter)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .populate('dealerId', 'name fullName email')
      .populate('car');

    // Increment views (async, not blocking)
    posts.forEach((post) => {
      CommunityPost.findByIdAndUpdate(post._id, { $inc: { views: 1 } }).exec();
    });

    // Pagination metadata
    const totalPages = Math.ceil(totalCount / limit);
    const hasMore = page < totalPages;

    res.json({
      success: true,
      data: {
        data: posts,
        pagination: {
          page,
          limit,
          totalPages,
          totalCount,
          hasMore,
        },
      },
    });
  } catch {
    
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
});



communityRoute.put('/:postId/like', async (req, res) => {
  const { postId } = req.params;
  const userId = (req as { user?: { _id: string } }).user?._id;

  try {
    const post = await CommunityPost.findById(postId);

    const alreadyLiked = (post as { likes: Array<{ likedByUser?: { toString: () => string } }> }).likes.some(
      (like: { likedByUser?: { toString: () => string } }) => like.likedByUser?.toString() === userId
    );

    if (alreadyLiked) {
    
      (post as { likes: Array<{ likedByUser?: { toString: () => string } }> }).likes = (post as { likes: Array<{ likedByUser?: { toString: () => string } }> }).likes.filter(
        (like: { likedByUser?: { toString: () => string } }) => like.likedByUser?.toString() !== userId
      );
    } else {
   
      (post as { likes: Array<{ likedByUser?: { toString: () => string } }> }).likes.push({ likedByUser: userId });
    }

    await (post as { save: () => Promise<unknown> }).save();

    res.json({
      success: true,
      liked: !alreadyLiked,
      likeCount: (post as { likes: Array<unknown> }).likes.length,
    });
  } catch {
   
    res.status(500).json({ error: 'Internal server error' });
  }
});

communityRoute.post('/:postId/comment', async (req, res) => {
  const { postId } = req.params;
  const  {text} = req.body;
  const userId = (req as { user?: { _id: string } }).user?._id;

  if (!text) {
    return res.status(400).json({ error: 'Comment text is required' });
  }
  if (typeof text !== 'string' || text.trim() === '') {
    return res.status(400).json({ error: 'Valid comment text is required' });
  }
  try {
    const post = await CommunityPost.findById(postId);
    if (!post) return res.status(404).json({ error: 'Post not found' });

    post.comments.push({
      commenterId: userId,
      text,
    });

    await post.save();

    res.status(201).json({
      success: true,
      message: 'Comment added successfully',
      comments: post.comments,
    });
  } catch {
    
    res.status(500).json({ error: 'Internal server error' });
  }
});
communityRoute.get('/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const post = await CommunityPost.findById(id)
      .populate('dealerId', 'name email')
      .populate('car');

    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

 
    await CommunityPost.findByIdAndUpdate(id, { $inc: { views: 1 } });

    res.json({
      post,
    });
  } catch {
   
    res.status(500).json({ message: 'Internal server error' });
  }
});
export default communityRoute;
