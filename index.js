var express = require('express')
var app = express()

var path = require('path');
var exec = require('child_process').exec;


app.set('views', path.join(__dirname, '/views'));
app.set('view engine', 'jade');


app.use(express.static( path.join(__dirname, './www') ,{
    setHeaders: function (res, path, stat) {
        res.set('Access-Control-Allow-Origin', '*');
    }
}));


app.get('/', function (req, res) {
    res.render('index.jade');
});

app.get('/up',function(req,res){
    var testcmd = 'pgrep -l svn';
    // 获取svn更新路径，如果没有更新路径则默认为全局 
    var cmd = 'cd ~/yhd_pc/svn/page/ && svn up';

    exec(testcmd,function(err,stdout,stderr){
        if(stdout){
            res.status(500).end('其他同事更新svn中....去群里吼下吧！');
        }else{
            exec(cmd, function(err, stdout, stderr) {
                if (err) {
                    res.status(500).end(err.toString());
                } else {
                    res.end(stdout);
                }
            });
        }
    })

});



var server = app.listen(4001, function () {

  var host = server.address().address
  var port = server.address().port

  console.log('Example app listening at http://%s:%s', host, port)

})