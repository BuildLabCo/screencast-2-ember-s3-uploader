import BaseSerializer from './base';

class PostSerializer extends BaseSerializer {
  constructor(data = {}) {
    super(data);
    this.fields = ['id','message','image','imageThumb','imageLarge','imageMedium','height','width','aspectRatio','blackListedUserIds','createdAt','updatedAt'];
  }

  imageLarge(itemData) {
    return "/large/large_" + itemData.image;
  }

  imageThumb(itemData) {
    return "/thumbnails/thumb_" + itemData.image;
  }

  imageMedium(itemData) {
    return "/medium/med_" + itemData.image; 
  }

  blackListedUserIds(itemData) {
    return [];
  }

}

export default PostSerializer;