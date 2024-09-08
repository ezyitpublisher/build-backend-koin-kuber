// associations.ts
// import interests from '@models/interest';
// import categoryInterestModel from '@models/categoryinterest';
// import uploadedimage from '@models/uploadedimage';
// import userModel from '@models/user';
// import likeModel from '@models/like';
// import orientation from '@models/orientation';
// import plan from '@models/plan';
// import mypackage from '@models/mypackage';
// import diamondquestion from '@models/diamondquestion';
// import diamondquecategory from '@models/categorydiamondque';
// import purchaseitems from '@models/purchaseItem';
// import lookingfor from '@models/lookingfor';
// multiple records 
// categoryInterestModel.hasMany(interests, { foreignKey: 'category_id', as: "interestData" });
// userModel.hasMany(uploadedimage, { foreignKey: 'user_id', as: "userimages" });
// userModel.hasMany(likeModel, { foreignKey: 'user_id', as: "userlike" });
// userModel.hasMany(purchaseitems, { foreignKey: 'user_id', as: "userpurchase" });
// mypackage.hasMany(plan, { foreignKey: 'package_id', as: "plans" });
// diamondquecategory.hasMany(diamondquestion, { foreignKey: 'question_category', as: "questions" });
// only one record
// userModel.belongsTo(orientation, { foreignKey: 'orientation_id', as: "orientation", targetKey: 'id' });
// userModel.belongsTo(lookingfor, { foreignKey: 'looking_for', as: "lookingfor", targetKey: 'id' });
//# sourceMappingURL=associations.js.map