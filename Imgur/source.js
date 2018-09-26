Imgur = {
    clientId: 'ab856d638e0e076',
    endpoint: 'https://api.imgur.com/3/',
    post: function(req, callback){
        let xhttp = new XMLHttpRequest();
        xhttp.open('GET', this.endpoint + req, true);
        xhttp.setRequestHeader('Authorization', 'Client-ID ' + this.clientId)
        xhttp.onreadystatechange = function(){
            if (this.readyState == 4) {
                obj = JSON.parse(this.responseText).data
                console.log(obj);
                callback(obj);
            }
        }
        xhttp.send();
    },
    postOther: function(req){
        let prom = {data:"not avaible"};
        let xhttp = new XMLHttpRequest();
        xhttp.open('GET', this.endpoint + req, true);
        xhttp.setRequestHeader('Authorization', 'Client-ID ' + this.clientId)
        xhttp.onreadystatechange = function(){
            if (this.readyState == 4) {
                obj = JSON.parse(this.responseText);
                console.log(obj);
                prom.data = obj;
            }
        }
        xhttp.send();
        return prom
    }
}

myApp = {
    data: null,
    current: 0,
    panels: [],
    init: function(){
        let btn = document.createElement("button");
        btn.innerHTML = "prev";
        document.body.appendChild(btn);

        btn = document.createElement("button");
        btn.innerHTML = "show most viral";
        btn.onclick = function(){
            Imgur.post("gallery/hot/time/day/0?showViral=true&mature=true", function(data){
                myApp.loadData(data);
            });
        }
        document.body.appendChild(btn);

        btn = document.createElement("button");
        btn.innerHTML = "next";
        btn.onclick = function(){
            myApp.showNext();
        }
        document.body.appendChild(btn);
        this.addPanel();
    },
    loadData: function(data){
        this.data = data;
        this.current = 0;
        this.showData(data[0]);
    },
    loadImage: function(panel, data){
        if(data.type == "image/gif"){
            if(data.animated && data.mp4){
                panel.video.src = data.mp4;
                panel.video.style.display = "block";
            } else {
                panel.image.src = data.link;
                panel.image.style.display = "block";
            }
        } else if(data.type == "video/mp4"){
            panel.video.src = data.link;
            panel.video.style.display = "block";
        } else {
            panel.image.src = data.link;
            panel.image.style.display = "block";
        }
    },
    showNext: function(){
        nextData = this.data[this.current++];
        this.showData(nextData);
    },
    showData: function(data){
        let i = 0;
        while(i < this.panels.length && (this.panels[i].video.style.display == "block" || this.panels[i].image.style.display == "block")){
            this.panels[i].image.style.display = "none";
            this.panels[i].video.style.display = "none";
            i++;
        }
        if(data.is_album){
            this.showGallery(data);
        } else {
            this.loadImage(this.panels[0], data);
        }
    },
    showGallery: function(gallery){
        if(gallery.images.length > this.panels.length){
            for(i = this.panels.length; i <= gallery.images.length; i++){
                this.addPanel();
            }
        }
        for(i = 0; i < gallery.images.length; i++){
            this.loadImage(this.panels[i], gallery.images[i]);
        }
    },
    addPanel: function(){
        let panel = {};
        panel.image = document.createElement("img");
        panel.image.src = "default.png";
        panel.image.width = 640;
        panel.image.style.display = "none";
        document.body.appendChild(panel.image);
        panel.video = document.createElement("video");
        panel.video.src = "";
        panel.video.width = 640;
        panel.video.type = type="video/mp4";
        panel.video.style.display = "none";
        panel.video.autoplay = true;
        panel.video.controls = true;
        document.body.appendChild(panel.video);
        this.panels.push(panel);
    }
}

myApp.init();