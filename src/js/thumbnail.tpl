
    {{ for(var i=0;i<imgList.length;i++) { }} 
    <div class="img-thumbnail {{=i === activeIndex ? 'active' : ''}} J-img-thumbnail">
        <div class="img-inner">
            <a href="javascript:void(0)">
            <img src="{{-imgList[i].src}}">
            <span class="circle"></span>
            </a>
        </div>

    </div>

    {{ } }}