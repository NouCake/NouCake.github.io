Imgur = {
    clientId: 'ab856d638e0e076',
    endpoint: 'https://api.imgur.com/3/',
    post: function(){
        let xhttp = new XMLHttpRequest();
        xhttp.open('GET', this.endpoint + 'gallery/r/cat/', true);
        xhttp.setRequestHeader('Authorization', 'Client-ID ' + this.clientId)
        xhttp.onreadystatechange = function(){
            if (this.readyState == 4) {
                myApp.loadData(JSON.parse(this.responseText).data);
            }
        }
        xhttp.send();
    },
    postOther: function(){
        let xhttp = new XMLHttpRequest();
        xhttp.open('GET', 'http://imgur.com/', true);
        //xhttp.setRequestHeader('Authorization', 'Client-ID ' + this.clientId)
        xhttp.onreadystatechange = function(){
            if (this.readyState == 4) {
                myApp.responded(JSON.parse(this.responseText));
            }
        }
        xhttp.send();
    },
    responded: function(res){
        console.log(res);
        if(res.success){
            document.body.innerHTML += '<img src="'+res.data[3].link+'"></img>';
        } else {
            //document.body.innerHTML = res;
        }
    }
}

myApp = {
    data: null,
    current: 0,
    init: function(){
        this.imgPanel = document.getElementById('panel');
        this.imgPanel.width = 640;
        this.imgPanel.onclick = this.nextImage.bind(this);
    },
    loadData: function(data){
        this.data = data;
        this.loadImage(data[0]);
    },
    loadImage: function(data){
        this.imgPanel.src = data.link;
    },
    nextImage: function(){
        this.loadImage(this.data[this.current++]);
    }
}

myApp.init();
Imgur.post();