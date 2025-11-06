// Campaign-related type definitions

// Google Ads API types
export interface GoogleAdsApiResponse {
  results?: Array<{
    resourceName?: string;
    [key: string]: unknown;
  }>;
  resourceName?: string;
  [key: string]: unknown;
}

export interface GoogleAdsApiRequest {
  operations?: Array<{
    create?: Record<string, unknown>;
    update?: Record<string, unknown>;
    remove?: string;
  }>;
  [key: string]: unknown;
}

// Image asset types
export interface ImageAssetData {
  buffer: Buffer;
  mimetype: string;
  originalname: string;
  size: number;
}

export interface ImageAssetOperation {
  create: {
    name: string;
    type: 'IMAGE';
    imageAsset: {
      data: string; // base64 encoded
    };
  };
}

// Client account types
export interface ClientAccountDetails {
  descriptiveName?: string;
  currencyCode?: string;
  timeZone?: string;
  [key: string]: unknown;
}

export interface ClientAccountRequest {
  customerClient: {
    descriptiveName: string;
    currencyCode: string;
    timeZone: string;
  };
}

// Campaign data types
export interface CampaignData {
  title: string;
  description: string;
  campaignObjective: string;
  networks: string[];
  adType: string;
  dailyBudget?: number;
  biddingStrategy: string;
  targetLocations: string;
  isABTesting: boolean;
  startDate: string;
  endDate: string;
  totalBudget?: number;
  searchAdA?: SearchAdData | null;
  searchAdB?: SearchAdData | null;
  displayAdA?: DisplayAdData | null;
  displayAdB?: DisplayAdData | null;
}

export interface SearchAdData {
  headlines: Array<{ text: string }>;
  descriptions: Array<{ text: string }>;
  path1?: string;
  path2?: string;
  finalUrl: string;
}

export interface DisplayAdData {
  headline: string;
  longHeadline?: string;
  descriptionText: string;
  imgUrl?: string;
  finalUrl: string;
}

// Campaign operation types
export interface CampaignOperationData {
  name: string;
  advertisingChannelType: string;
  status: string;
  campaignBudget: string;
  networkSettings: {
    targetGoogleSearch?: boolean;
    targetSearchNetwork?: boolean;
    targetContentNetwork?: boolean;
  };
  startDate: string;
  endDate: string;
  manualCpc?: Record<string, never>;
  targetSpend?: Record<string, never>;
  maximizeConversions?: Record<string, never>;
}

export interface AdGroupOperationData {
  name: string;
  campaign: string;
  status: string;
  type: string;
  cpcBidMicros?: string;
}

// Ad creative types
export interface AdCreativeData {
  adContent: SearchAdData | DisplayAdData;
  imageFileFromReq?: ImageAssetData;
  adSuffix: string;
  currentAdType: string;
}

export interface ResponsiveSearchAdOperation {
  create: {
    adGroup: string;
    status: string;
    ad: {
      name: string;
      responsiveSearchAd: {
        headlines: Array<{ text: string }>;
        descriptions: Array<{ text: string }>;
        path1?: string;
        path2?: string;
      };
      finalUrls: string[];
    };
  };
}

export interface ResponsiveDisplayAdOperation {
  create: {
    adGroup: string;
    status: string;
    ad: {
      name: string;
      responsiveDisplayAd: {
        marketingImages: Array<{ asset: string }>;
        headlines: Array<{ text: string }>;
        longHeadline: { text: string };
        descriptions: Array<{ text: string }>;
        businessName: string;
      };
      finalUrls: string[];
    };
  };
}

// Campaign status types
export interface CampaignStatusInfo {
  status: string;
  message: string;
  details?: unknown;
}

// Error types
export interface GoogleAdsError {
  code: string;
  message: string;
  details?: Array<{
    errors?: Array<{
      message: string;
      errorCode: string;
    }>;
    requestId?: string;
  }>;
}

// Request body types
export interface CampaignCreateRequestBody {
  title: string;
  description: string;
  campaignObjective: string;
  networksString?: string;
  adType: string;
  dailyBudget?: string;
  biddingStrategy: string;
  targetLocations: string;
  isABTestingString?: string;
  startDate: string;
  endDate: string;
  totalBudgetString?: string;
  searchAdAString?: string;
  searchAdBString?: string;
  displayAdAString?: string;
  displayAdBString?: string;
}

// File upload types for campaign
export interface CampaignFileUploads {
  displayAdAImageFile?: Express.Multer.File[];
  displayAdBImageFile?: Express.Multer.File[];
  searchAdAImageFile?: Express.Multer.File[];
  searchAdBImageFile?: Express.Multer.File[];
}

// Campaign request interface
export interface CampaignCreateRequestData {
  body: CampaignCreateRequestBody;
  files?: CampaignFileUploads;
}

// Utility types
export type BiddingStrategy = 'MANUAL_CPC' | 'MAXIMIZE_CLICKS' | 'MAXIMIZE_CONVERSIONS';
export type AdvertisingChannelType = 'SEARCH' | 'DISPLAY' | 'VIDEO';
export type AdType = 'Search' | 'Display' | 'Video';
export type CampaignStatusType = 'ENABLED' | 'PAUSED' | 'REMOVED';

// Network settings
export interface NetworkSettings {
  targetGoogleSearch?: boolean;
  targetSearchNetwork?: boolean;
  targetContentNetwork?: boolean;
  targetYouTubeSearch?: boolean;
  targetYouTubeVideos?: boolean;
  targetPartnerSearchNetwork?: boolean;
}

// Campaign metrics
export interface CampaignMetricsData {
  impressions: number;
  clicks: number;
  conversions: number;
  spend: number;
  ctr: number;
  cpc: number;
  conversionRate: number;
  costPerConversion: number;
}
