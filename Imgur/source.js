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

page = {
    divContent: null,
    divPostHeader: null,
    lbTitle: null,
    btnPrev: null,
    btnViral: null,
    btnForbidden: null,
    btnNext: null,
    panels: [],
    init: function(){
        this.loadElements();
        this.createNewPanel();
    },
    loadElements: function(){
        this.divContent = document.getElementById("content");
        this.divPostHeader = document.getElementById("postHeader");

        this.lbTitle = document.getElementById("postHeaderTitle");

        this.btnPrev = document.getElementById("btn_prev");
        this.btnViral = document.getElementById("btn_viral");
        this.btnForbidden = document.getElementById("btn_forbidden");
        this.btnNext = document.getElementById("btn_next");
    },
    createNewPanel: function(){
        let panel = {};

        panel.div = document.createElement("div");
        panel.div.className = "divImage";
        
        panel.image = document.createElement("img");
        panel.image.src = "default.png";
        panel.image.width = 640;
        panel.image.style.display = "none";
        panel.image.className = "image"
        
        panel.video = document.createElement("video");
        panel.video.src = "";
        panel.video.width = 640;
        panel.video.type = type="video/mp4";
        panel.video.style.display = "none";
        panel.video.autoplay = true;
        panel.video.controls = true;
        panel.video.className = "image"

        panel.description = document.createElement("p");
        panel.description.className = "postDescription"

        panel.div.appendChild(panel.image);
        panel.div.appendChild(panel.video);
        panel.div.appendChild(panel.description);

        this.divContent.appendChild(panel.div);
        this.panels.push(panel);
    },
    setTitle: function(title){
        this.showElement(this.divPostHeader);
        this.lbTitle.innerHTML = title;
    },
    hideElement: function(element){
        element.style.display = "none";
        if(element.pause) element.pause();
    },
    isVisible: function(element){
        return element.style.display != "none";
    },
    hideAllPanels: function(){
        let i = 0;
        while(i < this.panels.length && this.isVisible(this.panels[i].div)){
            this.hideElement(this.panels[i].image);
            this.hideElement(this.panels[i].video);
            this.hideElement(this.panels[i].description);
            this.hideElement(this.panels[i].div);
            i++;
        }
    },
    showElement: function(element){
        element.style.display = "block";
    },
    displayImage: function(index, source, description){
        this.panels[index].image.src = source;
        this.showElement(this.panels[index].div);
        this.showElement(this.panels[index].image);
        this.showDescription(index, description);
    },
    displayVideo: function(index, source, description){
        this.panels[index].video.src = source;
        this.showElement(this.panels[index].div);
        this.showElement(this.panels[index].video);
        this.showDescription(index, description);
    },
    showDescription: function(index, description){
        if(description){
            this.showElement(this.panels[index].description);
            this.panels[index].description.innerHTML = description;
        } else {
            this.hideElement(this.panels[index].description);
            this.panels[index].description.innerHTML = "";
        }
    }
}

myApp = {
    data: null,
    current: 0,
    init: function(){
        this.page = page;
        this.page.init();
        this.createButtonFunction();
    },
    createButtonFunction: function(){
        this.page.btnPrev.onclick = function(){
            myApp.showLast();
        }

        this.page.btnViral.onclick = function(){
            Imgur.post("gallery/hot/time/day/0?showViral=true&mature=true", function(data){
                myApp.loadData(data);
            });
        }
        
        this.page.btnForbidden.onclick = function(){
            Imgur.post("gallery/t/bowsette/rising/", function(data){
                myApp.loadData(data.items);
            });
        }

        this.page.btnNext.onclick = function(){
            myApp.showNext();
        }
    },
    loadData: function(data){
        this.data = data;
        this.current = 0;
        this.showData(data[0]);
    },
    showNext: function(){
        if(this.current+1 < this.data.length){
            nextData = this.data[++this.current];
            this.showData(nextData);
        } else {
            console.log("reached max");
        }

    },
    showLast: function(){
        if(this.current > 0){
            nextData = this.data[--this.current];
            this.showData(nextData);
        } else {
            console.log("reached first");
        }

    },
    showData: function(data){
        this.page.setTitle(data.title);
        this.page.hideAllPanels();
        if(data.is_album){
            this.showGallery(data);
        } else {
            this.showSingle(0, data);
        }
    },
    showSingle: function(index, data){
        if(data.type = "image/gif"){
            if(data.animated && data.mp4){
                this.page.displayVideo(index, data.mp4);
            } else {
                this.page.displayImage(index, data.link);
            }
        } else if(data.type = "mp4/video"){
            this.page.displayVideo(index, data.link);
        } else {
            this.page.displayImage(index, data.link);
        }
        this.page.showDescription(index, data.description);
    },
    showGallery: function(gallery){
        if(gallery.images.length > this.page.panels.length){
            for(i = this.page.panels.length; i <= gallery.images.length; i++){
                this.page.createNewPanel();
            }
        }
        for(i = 0; i < gallery.images.length; i++){
            this.showSingle(i, gallery.images[i]);
        }
    },
}

myApp.init();