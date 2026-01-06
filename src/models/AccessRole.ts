import mongoose from "mongoose";

const accessRoleSchema = new mongoose.Schema({
  roleId: {
    type: String,
    required: true,
    unique: true,  
  },
  description: {
    type: String,
  }, 
  
  permissions: {
    sidebar: {
      dashboard: Boolean,
      inventory: Boolean,
      crm: Boolean,
      community: Boolean,
      customers: Boolean,
      dealer: Boolean,
      importcustomers: Boolean,
      matching: Boolean,
      subscriptionmanage:Boolean,
      ads:Boolean,
      hotproducts:Boolean,
      planbilling:Boolean,
      dealerRequests:Boolean,
      carSold:Boolean,
    },
    car: {
      view: Boolean,
      create: Boolean,
      edit: Boolean,
      delete: Boolean,
    },
    leads: {
      view: Boolean,
      assign: Boolean,
      remind: Boolean,
      email: Boolean,
      create: Boolean,
      delete: Boolean,
      edit: Boolean,
    },
    ads:{
      view: Boolean,
      create: Boolean,
      edit: Boolean,
      delete: Boolean,
    },
    users: {
      manage: Boolean,
    },  
    spares: {
      view: Boolean,
      create: Boolean,
      edit: Boolean,
      delete: Boolean,
    },
    subscription: {
      view: Boolean,
      manage: Boolean,
    },
    settings: {
      update: Boolean,
    },
    carSold: {
      view: Boolean,
      create: Boolean,
      edit: Boolean,
      delete: Boolean,
    },
    adminPanel: {
    access: Boolean,
    viewUser:Boolean,
    deleteUser:Boolean,
    viewDealer:Boolean,
    deleteDealer:Boolean,
    viewStatistics:Boolean,
    
   },
   
  },
}, { timestamps: true });

export default mongoose.model('AccessRole', accessRoleSchema);
