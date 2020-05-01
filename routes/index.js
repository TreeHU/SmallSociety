/*
  @author : ljw
  @since : 180211
*/

var express = require('express');
var user_info = require('../models/user_info');
var memo = require('../models/memo');
var multer = require('multer');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});




/*
@since 080211
@des : 번호 0 ~ 3 까지는 layout.ejs 뷰에 렌더링됨. 기존에 불필요하게 반복해서 적었던 요소를 뷰에 때려넣거나, nav.html와 subnav_xxx.html로 분리함.
a) 상단 네비게이션 : nav.html
b) 상단 서브네비게이션 : subnav_leader.html / subnav_smallclub.html
*/







// 0. 작은모임 페이지 라우터 메소드
router.get('/smallclub', function(req, res, next) {
  res.render('layout',{sub : "smallmain",title:"작은사회 - 작은모임"});
});

router.get('/smallclub/:sub', function(req, res, next) {
  var second_depth = req.params.sub;
  var title_string;
  if(second_depth=="smallbook") title_string = "작은사회 - 작은사색";
  else if(second_depth=="smallvideo") title_string = "작은사회 - 작은영상";
  else if(second_depth=="smallart") title_string = "작은사회 - 작은예술";
  res.render('layout',{
    sub : second_depth,
    title : title_string
  });
});


// 1. 운영진 페이지 라우터 메소드
router.get('/leader',function(req,res,next){
  res.render('layout',{sub : "leadermain",title:"작은사회 - 운영진"});
});

router.get('/leader/:sub', function(req, res, next) {
  var second_depth = req.params.sub;
  var title_string;
  if(second_depth=="management") title_string = "작은사회 - 전략기획팀";
  else if(second_depth=="design") title_string = "작은사회 - 브랜드디자인팀";
  else if(second_depth=="account") title_string = "작은사회 - 재무회계팀";
  else if(second_depth=="uiux") title_string = "작은사회 - UI/UX팀";
  else if(second_depth=="it") title_string = "작은사회 - IT개발팀";
  else if(second_depth=="production") title_string = "작은사회 - 프로덕션팀";
  res.render('layout',{
    sub : second_depth,
    title : title_string
  });
});

// 2. 공지사항 페이지 라우터 메소드
router.get('/notice',function(req,res,next){
  res.render('layout',{
    sub : "notice",
    notice_num : "none",
    title : "작은사회 - 공지사항"
  });
});

/*
 2.1) 공지게시물.. 업데이트 방법
 DB연동이 따로 안되어있어, 기존 게시 방법에 충실하여 구현함

 a) notice.html : 링크를 걸때 /notice/{게시물번호} 로 건다.
 b) notice{게시물번호}.html : 위와 같은
*/
router.get('/notice/:num',function(req,res,next){
  var second_depth = req.params.num;
  res.render('layout',{
    sub : "notice",
    notice_num : second_depth,
    title : "작은사회 - 공지사항"
  });
});


// 3. 로그인이 안되어있으면 로그인페이지, 이미 되어있으면 /member 리다이렉션
router.get('/login',function(req,res,next){
  if(!req.session._id){
    res.render('layout',{
      sub:"login",
      title : "작은사회 - 회원로그인"
    })
  }else{
    res.redirect('/member');
  }
})

// 4. 로그인 api
router.post('/login/signin',function(req,res,next){
  const sid = req.body.userid;
  const spwd = req.body.password;
  user_info.findOne({
    id:sid,
    pwd:spwd
  },function(err,docs){
    if(err) throw err;

    if(!docs){
      return res.status(401).json({
        error : "로그인 실패",
        code : 1
      })
    }

    // 세션에 저장
    let sess = req.session;
    sess._id = docs._id;
    sess.nickname = docs.nickname;

    return res.redirect('/member');
  })
})

// 5. 로그아웃 api
router.get('/login/signout',function(req,res,next){
  req.session.destroy(function(err){
    if(err) throw err;
  });
  return res.redirect('/');
})


// 6. member 페이지 라우터 메소드
router.get('/member',function(req,res,next){
  if(!req.session._id){
    res.redirect('login');
  }
  res.render('memberLayout',{
    sub : "main",
  });
})

router.get('/member/:sub',function(req,res,next){
  if(!req.session._id){
    res.redirect('login');
  }
  var second_depth = req.params.sub;
  res.render('memberLayout',{
    sub:second_depth
  })
})

router.get('/member/:sub/write',function(req,res){
  if(!req.session._id){
    res.redirect('login');
  }
  var second_depth = req.params.sub;
  res.render('memberLayout',{
    sub:second_depth+"_write"
  })
})

// 파일 업로드
router.post('/upload',multer({
  dest:'public/uploaded/'
}).single('upfile'),function(req,res){
  console.log("file upload at uploaded/"+req.file.filename);
  res.json({
    isUp : true,
    imgs : "uploaded/"+req.file.filename
  })
})



// 게시글 작성
router.post('/write/:type',function(req,res,next){
  if(!req.session._id){
    // *****잘못된 접근 (로그인 안되어있음)
  }
  const sess = req.session;

  var newmemo = new memo({
    type : req.params.type,
    content : req.body.content,
    nickname : sess.nickname,
    time : new Date()
  })

  newmemo.save( function(err){
    if(err) return res.json({success : false});
    return res.json({success:true});
  })
})

module.exports = router;
