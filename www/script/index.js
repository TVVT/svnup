// index.js
function onload(){

    var $update = document.getElementById('update');
    var $output = document.getElementById('output');
    $update.addEventListener('click',function(){
        showLoading(true);
        get('./up',function(res){
            var html = $output.innerHTML;
            html = res + html;
            $output.innerHTML = html;
            showLoading(false);
        },function(res){
            var html = $output.innerHTML;
            html = '<div class="error">'+res+'</div>' + html;
            $output.innerHTML = html;
            showLoading(false);
        });
        $output.scrollTop = 0;
    });
}



var get = function(url,callback,error,timeout,outtime,contentType){
    var contentType = contentType || 'application/json';
    var outtime = outtime || 15000;

    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function(){
    if(xhr.readyState === 4){
            if(xhr.status <= 400){
                callback && callback.apply(null,[xhr.responseText]);
            }else{
                error && error.apply(null,[xhr.responseText]);
            }
        }
    };
    xhr.open('GET',url);
    xhr.setRequestHeader("Content-type", contentType);
    xhr.timeout = outtime;
    xhr.ontimeout = function () { 
        timeout && timeout.apply(null);
    }
    xhr.send(null);
};


function showLoading(b){
    var $loading = document.getElementById('loading');
    if(b){
        $loading.classList.add('show');
    }else{
        $loading.classList.remove('show');
    }
}
