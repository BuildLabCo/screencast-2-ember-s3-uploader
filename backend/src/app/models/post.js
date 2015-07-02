import { thinky } from '../initializers/database';
import moment from 'moment';
let type = thinky.type;

const attributes = {
  id:           type.string(),
  image:        type.string().required(),
  message:      type.string().allowNull(true),
  height:       type.number().allowNull(true),
  width:        type.number().allowNull(true),
  aspectRatio:  type.number().allowNull(true),
  createdAt:  type.date().default(moment.utc().format()),
  updatedAt:  type.date().default(moment.utc().format())
};

let Post = thinky.createModel('posts', attributes);

Post.defineRelations = function(){
  // Define relationships here
};

export default Post;