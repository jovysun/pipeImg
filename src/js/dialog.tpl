<div class="pipeImg-wrapper J-pipe-wrapper">
    <div class="pipe-header">
        <ul class="menu">
            <li class="item J-item active"><a class="btn J-menu-btn" href="javascript:void(0)"><i class="ob-icon icon-refresh"></i>{{=rotateMenuTxt}}</a></li>
            <li class="item J-item"><a class="btn J-menu-btn" href="javascript:void(0)"><i class="ob-icon icon-crop"></i>{{=cropMenuTxt}}</a></li>
            <li class="item J-item"><a class="btn J-menu-btn" href="javascript:void(0)"><i class="ob-icon icon-scaling"></i>{{=scaleMenuTxt}}</a></li>
            <li class="item J-item J-item-mark">
                <a class="btn J-menu-btn" href="javascript:void(0)"><i class="ob-icon icon-add-l"></i>{{=markMenuTxt}}</a>
                <div class="item item-sub">
                    <a class="btn J-menu-btn-sub" href="javascript:void(0)"><i class="ob-icon icon-batch"></i>{{=markAllMenuTxt}}</a>
                </div>
            </li>
            <li class="item J-item J-item-mark-all" style="display:none;">
                <a class="btn J-menu-btn" href="javascript:void(0)"><i class="ob-icon icon-batch"></i>{{=markAllMenuTxt}}</a>
                <div class="item item-sub">
                    <a class="btn J-menu-btn-sub" href="javascript:void(0)"><i class="ob-icon icon-add-l"></i>{{=markMenuTxt}}</a>
                </div>
            </li>
        </ul>
        <a class="btn btn-close J-button-close" href="javascript:void(0)"><i class="ob-icon icon-delete"></i>{{=closeBtnTxt}}</a>
    </div>
    <div class="pipe-content">
        <!-- 旋转面板 -->
        <div class="panel active J-panel J-rotate-panel">
            <div class="img-box J-img-box">
                <img class="J-source" src="{{-imgList[0].src}}">
            </div>
            <div class="content-footer">
                <div class="size">
                    <span class="J-num-width"></span>*<span class="J-num-height"></span>px
                </div>
                <a class="btn btn-rotate J-btn-rotate-left" href="javascript:void(0)"><i class="ob-icon icon-rotate-l"></i>{{=turnLeftTxt}}</a>
                <a class="btn btn-rotate J-btn-rotate-right" href="javascript:void(0)"><i class="ob-icon icon-rotate-r"></i>{{=turnRightTxt}}</a>

                <div class="buttons">
                    <a class="button button-main J-button-save" href="javascript:void(0)">{{=saveBtnTxt}}</a>
                    <a class="button button-reset J-button-reset" href="javascript:void(0)">{{=resetBtnTxt}}</a>
                </div>
            </div>
        </div>
        <!-- 裁剪面板 -->
        <div class="panel J-panel J-crop-panel">
            <div class="img-box J-img-box J-crop-box">
                <img class="J-source" src="{{-imgList[0].src}}">
            </div>
            <div class="content-footer">
                <input class="num-width J-num-width J-input-crop-width" type="text">
                <input class="J-fix-ratio J-radio-crop-fix" id="fixRatio" type="checkbox" name="fixRatio" hidden>
                <label class="fix" for="fixRatio"><i class="ob-icon icon-lock"></i></label>
                <input class="num-height J-num-height J-input-crop-height" type="text">
                <span class="txt">px</span>

                <div class="buttons">
                    <a class="button button-main J-button-save" href="javascript:void(0)">{{=saveBtnTxt}}</a>
                    <a class="button button-reset J-button-reset" href="javascript:void(0)">{{=resetBtnTxt}}</a>
                </div>
            </div>

        </div>
        <!-- 缩放面板 -->
        <div class="panel J-panel J-scale-panel">
            <div class="img-box J-img-box">
                <div class="scale-img-wrapper J-scale-img-wrapper">
                    <img class="J-source" src="{{-imgList[0].src}}">
                </div>
            </div>
            <div class="content-footer">
                <input class="num-width J-num-width J-input-scale-width" type="text">
                <span class="txt">X</span>
                <input class="num-height J-num-height J-input-scale-width" type="text">
                <span class="txt">px</span>
                <input class="scale-range J-scale-range J-range-scale-ratio" type="range" name="scaleRatio" min="5" max="100" step="1" defaultValue="100">

                <div class="buttons">
                    <a class="button button-main J-button-save" href="javascript:void(0)">{{=saveBtnTxt}}</a>
                    <a class="button button-reset J-button-reset" href="javascript:void(0)">{{=resetBtnTxt}}</a>
                </div>
            </div>

        </div>
        <!-- 添加水印面板 -->
        <div class="panel J-panel J-mark-panel">
            <div class="img-box J-img-box J-mark-box">
                <img class="J-source" src="{{-imgList[0].src}}">
            </div>
            <div class="content-footer">
                <div class="item">
                    <div class="txt-label">{{=colorTxt}}:</div> 
                    <input class="J-color J-radio-mark-color" id="colorWhite" type="radio" name="color" value="0" autocomplete="off" hidden>        
                    <label class="color" for="colorWhite"></label>
                    <input class="J-color J-radio-mark-color" id="colorBlack" type="radio" name="color" value="1" checked autocomplete="off" hidden>
                    <label class="color color-black" for="colorBlack"></label>
                </div>
                <div class="item">
                    <div class="txt-label">{{=positionTxt}}:</div>
                    <input class="J-position J-radio-mark-position" id="positionCenter" type="radio" name="position" value="0" autocomplete="off" checked hidden>
                    <label class="position center" for="positionCenter"><span class="line"></span></label>
                    <input class="J-position J-radio-mark-position" id="positionLeftTop" type="radio" name="position" value="1" autocomplete="off" hidden>
                    <label class="position left-top" for="positionLeftTop"><span class="line"></span></label>
                    <input class="J-position J-radio-mark-position" id="positionRightTop" type="radio" name="position" value="2" autocomplete="off" hidden>
                    <label class="position right-top" for="positionRightTop"><span class="line"></span></label>
                    <input class="J-position J-radio-mark-position" id="positionLeftBottom" type="radio" name="position" value="3" autocomplete="off" hidden>
                    <label class="position left-bottom" for="positionLeftBottom"><span class="line"></span></label>
                    <input class="J-position J-radio-mark-position" id="positionRightBottom" type="radio" name="position" value="4" autocomplete="off" hidden>
                    <label class="position right-bottom" for="positionRightBottom"><span class="line"></span></label>
                </div>
                <div class="item">
                    <div class="txt-label">{{=opacityTxt}}:</div>
                    <input class="opacity-range J-opacity J-range-mark-opacity" name="opacity" type="range" min="0" max="1" step="0.1" defaultValue="0.8">
                </div>

                <select class="J-markTxt J-select-mark-txt" name="markTxt">
                    <option value="0" selected="selected">{{=showRoomTxt}}</option>
                    <option value="1">{{=companyNameTxt}}</option>
                </select>

                <div class="buttons">
                    <a class="button button-confirm J-button-confirm" href="javascript:void(0)">{{=confirmBtnTxt}}</a>
                    <a class="button button-cancel J-button-cancel" href="javascript:void(0)">{{=cancelBtnTxt}}</a>
                </div>
            </div>

        </div>
        <!-- 批量添加水印 -->
        <div class="panel panel-mark-all J-panel J-mark-all-panel">
            <div class="img-box J-img-box J-mark-box-all">
                <img class="J-source" src="{{-imgList[0].src}}">
            </div>
            <div class="imgs-thumbnail">
                {{ for(var i=0;i<imgList.length;i++) { }} 
                <a class="img-thumbnail {{=i === 0 ? 'active' : ''}} J-img-thumbnail" href="javascript:void(0)">
                    <img src="{{-imgList[i].src}}">
                    <span class="circle"></span>
                </a>
                {{ } }}
            </div>
            <div class="content-footer">
                <div class="item">
                    <div class="txt-label">{{=colorTxt}}:</div> 
                    <input class="J-color J-radio-mark-color" id="colorWhiteAll" type="radio" name="colorAll" value="0" autocomplete="off" hidden>        
                    <label class="color" for="colorWhiteAll"></label>
                    <input class="J-color J-radio-mark-color" id="colorBlackAll" type="radio" name="colorAll" value="1" checked autocomplete="off" hidden>
                    <label class="color color-black" for="colorBlackAll"></label>
                </div>
                <div class="item">
                    <div class="txt-label">{{=positionTxt}}:</div>
                    <input class="J-position J-radio-mark-position" id="positionCenterAll" type="radio" name="positionAll" value="0" autocomplete="off" checked hidden>
                    <label class="position center" for="positionCenterAll"><span class="line"></span></label>
                    <input class="J-position J-radio-mark-position" id="positionLeftTopAll" type="radio" name="positionAll" value="1" autocomplete="off" hidden>
                    <label class="position left-top" for="positionLeftTopAll"><span class="line"></span></label>
                    <input class="J-position J-radio-mark-position" id="positionRightTopAll" type="radio" name="positionAll" value="2" autocomplete="off" hidden>
                    <label class="position right-top" for="positionRightTopAll"><span class="line"></span></label>
                    <input class="J-position J-radio-mark-position" id="positionLeftBottomAll" type="radio" name="positionAll" value="3" autocomplete="off" hidden>
                    <label class="position left-bottom" for="positionLeftBottomAll"><span class="line"></span></label>
                    <input class="J-position J-radio-mark-position" id="positionRightBottomAll" type="radio" name="positionAll" value="4" autocomplete="off" hidden>
                    <label class="position right-bottom" for="positionRightBottomAll"><span class="line"></span></label>
                </div>
                <div class="item">
                    <div class="txt-label">{{=opacityTxt}}:</div>
                    <input class="opacity-range J-opacity J-range-markAll-opacity" name="opacityAll" type="range" min="0" max="1" step="0.1" defaultValue="0.8">
                </div>

                <select class="J-markTxt J-select-markAll-txt" name="markTxtAll">
                    <option value="0" selected="selected">{{=showRoomTxt}}</option>
                    <option value="1">{{=companyNameTxt}}</option>
                </select>
                
            </div>

        </div>
    </div>
    <div class="pipe-footer J-imgs-thumbnail J-footer-normal">
        {{ for(var i=0;i<imgList.length;i++) { }} <a class="img-thumbnail {{=i === 0 ? 'active' : ''}} J-img-thumbnail"
            href="javascript:void(0)">
            <img src="{{-imgList[i].src}}">
            <span class="circle"></span>
            </a>
            {{ } }}
    </div>
    <div class="pipe-footer mark-all-footer J-footer-special" style="display:none;">
        <div class="buttons">
            <a class="button button-confirm J-button-confirm-all" href="javascript:void(0)">{{=saveBtnTxt}}</a>
            <a class="button button-cancel J-button-cancel" href="javascript:void(0)">{{=cancelBtnTxt}}</a>
        </div>
    </div>

</div>