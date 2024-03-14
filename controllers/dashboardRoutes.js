const router = require('express').Router();
const sequelize = require('../config/connection');
const { Blog, User, Comment } = require('../models');
const withAuth = require('../utils/auth');

// get all posts for dashboard
router.get('/', withAuth, (req, res) => {
  Blog.findAll({
    where: {
      user_id: req.session.user_id
    },
    attributes: [
      'id',
      'content',
      'title',
      'created_at'
    ],
    include: [
      {
        model: Comment,
        attributes: ['id', 'comment_text', 'blog_id', 'user_id', 'created_at'],
        include: {
          model: User,
          attributes: ['name']
        }
      },
      {
        model: User,
        attributes: ['name']
      }
    ]
  })
    .then(dbBlogData => {
      const blogs = dbBlogData.map(blog => blog.get({ plain: true }));
      res.render('dashboard', {blogs, loggedIn: true, name: req.session.name });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.get('/blog/:id', withAuth, (req, res) => {
  Post.findByPk(req.params.id, {
    attributes: [
      'id',
      'content',
      'title',
      'created_at'
    ],
    include: [
      {
        model: Comment,
        attributes: ['id', 'comment_text', 'blog_id', 'user_id', 'created_at'],
        include: {
          model: User,
          attributes: ['name']
        }
      },
      {
        model: User,
        attributes: ['name']
      }
    ]
  })
    .then(dbBlogData => {
      if (dbBlogData) {
        const blog = dbBlogData.get({ plain: true });
        
        res.render('blogId', {
          blog,
          loggedIn: true,
          name: req.session.name
        });
      } else {
        res.status(404).end();
      }
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

module.exports = router;