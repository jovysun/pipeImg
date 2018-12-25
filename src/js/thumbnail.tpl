
    {{ for(var i=0;i<imgList.length;i++) { }} 
    <div class="img-thumbnail {{=i === activeIndex ? 'active' : ''}} J-img-thumbnail">
        <div class="img-inner">
            <a href="javascript:void(0)">
            {{ if(markType === '1') { }}   
            <img src="{{-imgList[i].src}}" title="{{-imgList[i].width}}px * {{-imgList[i].height}}px">
            {{ }else{ }}
                <img src="{{-imgList[i].src}}" title="{{-imgList[i].src}}">
            {{ } }}
            <span class="circle"></span>
            </a>
        </div>

    </div>

    {{ } }}