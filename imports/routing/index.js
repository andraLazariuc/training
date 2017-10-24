import route from './router.js';
import Home from '/imports/ui/Home.jsx';
import Login from '/imports/ui/pages/user/Login.jsx';
import Register from '/imports/ui/pages/user/Register.jsx';
import PostCreate from '/imports/ui/pages/posts/PostCreate.jsx';
import PostsList from '/imports/ui/pages/posts/PostsList.jsx';
import PostEdit from '/imports/ui/pages/posts/PostEdit.jsx';

route('/', Home);
route('/login', Login);
route('/register', Register);
route('/post/create', PostCreate);
route('/post/list', PostsList);
route('/post/edit/:_id', PostEdit);
/*route('/post/edit/:_id', {
  action(params, queryParams) {
    console.log("postId: " + this.params._id);
  }
}, PostEdit);*/