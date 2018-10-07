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
    }
}

page = {
    divImageContainer: null,
    divPostHeader: null,
    divSauce: null,
    divComments: null,
    lbTitle: null,
    lbComment: null,
    lbSauce: null,
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
        this.divImageContainer = document.getElementById("imageContainer");
        this.divPostHeader = document.getElementById("postHeader");
        this.divSauce = document.getElementById("sauceContainer");
        this.divComments = document.getElementById("commentContainer");

        this.lbTitle = document.getElementById("postHeaderTitle");
        this.lbComment = document.getElementById("topComment");
        this.lbSauce = document.getElementById("sauce");

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
        panel.image.addEventListener("click", myApp.showNext.bind(myApp));
        
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

        this.divImageContainer.appendChild(panel.div);
        this.panels.push(panel);
    },
    setTitle: function(title){
        this.showElement(this.divPostHeader);
        this.lbTitle.innerHTML = title;
    },
    setSauce: function(link){
        this.lbSauce.href = link;
    },
    setComment: function(comment){
        this.lbComment.innerHTML = comment;
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
        this.showElement(this.divSauce);
        this.showElement(this.divComments);
        this.showDescription(index, description);
    },
    displayVideo: function(index, source, description){
        this.panels[index].video.src = source;
        this.showElement(this.panels[index].div);
        this.showElement(this.panels[index].video);
        this.showElement(this.divSauce);
        this.showElement(this.divComments);
        this.showDescription(index, description);
    },
    showDescription: function(index, description){
        if(description){
            this.showElement(this.panels[index].description);
            this.panels[index].description.innerHTML = description.replace(/\n/g, '<br />');
        } else {
            this.hideElement(this.panels[index].description);
            this.panels[index].description.innerHTML = "";
        }
    }
}

myApp = {
    data: null,
    current: 0,
    currentPage: 0,
    lastReq: this.loadMostViral,
    init: function(){
        this.page = page;
        this.page.init();
        this.createButtonFunction();
    },
    createButtonFunction: function(){
        this.page.btnPrev.onclick = this.showLast.bind(this);
        this.page.btnViral.onclick = this.loadMostViral.bind(this);
        this.page.btnForbidden.onclick = this.loadForbidden.bind(this);
        this.page.btnNext.onclick = this.showNext.bind(this);
    },
    loadMostViral: function(){
        Imgur.post("gallery/hot/time/day/"+this.currentPage+"?mature=true", function(data){
            myApp.loadData(data);
            myApp.lastReq = myApp.loadMostViral;
        });
    },
    loadForbidden: function(){
        Imgur.post("gallery/t/bowsette/rising/day/"+this.currentPage+"?mature=true", function(data){
            myApp.loadData(data.items);
            myApp.lastReq = myApp.loadForbidden;
        });
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
            this.currentPage++;
            this.lastReq();
        }

    },
    showLast: function(){
        if(this.current > 0){
            nextData = this.data[--this.current];
            this.showData(nextData);
        } else {
            if(this.currentPage > 0){
                this.currentPage--;
                this.lastReq();
            }
        }

    },
    showData: function(data){
        this.page.setTitle(data.title);
        this.page.hideAllPanels();
        this.page.setSauce(data.link);
        Imgur.post("gallery/"+data.id+"/comments/best", function(data){
            page.setComment(data[0].comment);
        })
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
        //checks if not all images are loaded
        //should be necessary if gallery has more than 3 images
        if(gallery.images.length != gallery.images_count){
            if(!gallery.reloaded) { //prevents infinity loop on error (hopefully) 
                    Imgur.post('gallery/' + gallery.id, function(data){
                    myApp.showData(data);
                    gallery.images = data.images;
                    gallery.reloaded = true;
                });
            }
        }

        //creates panels if necessary
        if(gallery.images_count > this.page.panels.length){
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