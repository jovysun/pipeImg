<div class="pipeImg-wrapper J-pipe-wrapper">
    <div class="pipeImg-header">
        <ul class="pipeImg-menu">
            <li class="pipeImg-item J-item active"><a class="pipeImg-btn J-menu-btn" href="javascript:void(0)"><i class="ob-icon icon-refresh"></i>{{=rotateMenuTxt}}</a></li>
            <li class="pipeImg-item J-item"><a class="pipeImg-btn J-menu-btn" href="javascript:void(0)"><i class="ob-icon icon-crop"></i>{{=cropMenuTxt}}</a></li>
            <li class="pipeImg-item J-item"><a class="pipeImg-btn J-menu-btn" href="javascript:void(0)"><i class="ob-icon icon-scaling"></i>{{=scaleMenuTxt}}</a></li>
            <li class="pipeImg-item J-item J-item-mark">
                <a class="pipeImg-btn J-menu-btn" href="javascript:void(0)"><i class="ob-icon icon-add-l"></i>{{=markMenuTxt}}</a>
                <div class="pipeImg-btn J-menu-txt" style="display:none;"><i class="ob-icon icon-add-l"></i>{{=markMenuTxt}}</div>
                <div class="pipeImg-item item-sub">
                    <a class="pipeImg-btn J-menu-btn-mark-all" href="javascript:void(0)"><i class="ob-icon icon-batch"></i>{{=markAllMenuTxt}}</a>
                    <a class="pipeImg-btn J-menu-btn-mark" href="javascript:void(0)" style="display:none;"><i class="ob-icon icon-add-l"></i>{{=markMenuTxt}}</a>
                </div>
            </li>
        </ul>
        <a class="pipeImg-btn btn-close J-button-close" href="javascript:void(0)"><i class="ob-icon icon-delete"></i>{{=closeBtnTxt}}</a>
    </div>
    <div class="pipeImg-content">
        <!-- 旋转面板 -->
        <div class="pipeImg-panel rotate-panel active J-panel J-rotate-panel">
            <div class="img-box J-img-box">
                <img class="J-source" src="{{-imgList[0].src}}">
            </div>
            <div class="content-footer">
                <div class="size">
                    <span class="J-num-width"></span>*<span class="J-num-height"></span>px
                </div>
                <a class="pipeImg-btn btn-rotate J-btn-rotate-left" href="javascript:void(0)"><i class="ob-icon icon-rotate-l"></i>{{=turnLeftTxt}}</a>
                <a class="pipeImg-btn btn-rotate J-btn-rotate-right" href="javascript:void(0)"><i class="ob-icon icon-rotate-r"></i>{{=turnRightTxt}}</a>

                <div class="pipeImg-buttons">
                    <a class="pipeImg-button button-main J-button-save" href="javascript:void(0)">{{=saveBtnTxt}}</a>
                    <a class="pipeImg-button button-reset J-button-reset" href="javascript:void(0)">{{=resetBtnTxt}}</a>
                </div>
            </div>
        </div>
        <!-- 裁剪面板 -->
        <div class="pipeImg-panel J-panel J-crop-panel">
            <div class="img-box J-img-box">
                <img class="J-source" src="{{-imgList[0].src}}">
            </div>
            <div class="content-footer">
                <input class="num-width J-num-width" type="text">
                <input class="J-fix-ratio" id="fixRatio" type="checkbox" name="fixRatio" hidden>
                <label class="fix" for="fixRatio"><i class="ob-icon icon-lock"></i></label>
                <input class="num-height J-num-height" type="text">
                <span class="txt">px</span>

                <div class="pipeImg-buttons">
                    <a class="pipeImg-button button-main J-button-save" href="javascript:void(0)">{{=saveBtnTxt}}</a>
                    <a class="pipeImg-button button-reset J-button-reset" href="javascript:void(0)">{{=resetBtnTxt}}</a>
                </div>
            </div>

        </div>
        <!-- 缩放面板 -->
        <div class="pipeImg-panel scale-panel J-panel J-scale-panel">
            <div class="img-box J-img-box">
                <div class="scale-img-wrapper J-scale-img-wrapper">
                    <img class="J-source" src="{{-imgList[0].src}}">
                </div>
            </div>
            <div class="content-footer">
                <input class="num-width J-num-width" type="text">
                <span class="txt">X</span>
                <input class="num-height J-num-height" type="text">
                <span class="txt">px</span>
                <input class="scale-range J-scale-range" type="range" name="scaleRatio" min="5" max="100" step="1" defaultValue="100" value="100">

                <div class="pipeImg-buttons">
                    <a class="pipeImg-button button-main J-button-save" href="javascript:void(0)">{{=saveBtnTxt}}</a>
                    <a class="pipeImg-button button-reset J-button-reset" href="javascript:void(0)">{{=resetBtnTxt}}</a>
                </div>
            </div>

        </div>
        <!-- 添加水印面板 -->
        <div class="pipeImg-panel J-panel J-mark-panel">
            <div class="img-box J-img-box">
                <img class="J-source" src="{{-imgList[0].src}}">
            </div>
            <div class="content-footer">
                <div class="pipeImg-item">
                    <div class="txt-label">{{=colorTxt}}:</div> 
                    <input class="J-color" id="colorWhite" type="radio" name="color" value="0" autocomplete="off" hidden>        
                    <label class="color" for="colorWhite"></label>
                    <input class="J-color" id="colorBlack" type="radio" name="color" value="1" checked autocomplete="off" hidden>
                    <label class="color color-black" for="colorBlack"></label>
                </div>
                <div class="pipeImg-item">
                    <div class="txt-label">{{=positionTxt}}:</div>
                    <input class="J-position" id="positionCenter" type="radio" name="position" value="0" autocomplete="off" checked hidden>
                    <label class="position center" for="positionCenter"><span class="line"></span></label>
                    <input class="J-position" id="positionLeftTop" type="radio" name="position" value="1" autocomplete="off" hidden>
                    <label class="position left-top" for="positionLeftTop"><span class="line"></span></label>
                    <input class="J-position" id="positionRightTop" type="radio" name="position" value="2" autocomplete="off" hidden>
                    <label class="position right-top" for="positionRightTop"><span class="line"></span></label>
                    <input class="J-position" id="positionLeftBottom" type="radio" name="position" value="3" autocomplete="off" hidden>
                    <label class="position left-bottom" for="positionLeftBottom"><span class="line"></span></label>
                    <input class="J-position" id="positionRightBottom" type="radio" name="position" value="4" autocomplete="off" hidden>
                    <label class="position right-bottom" for="positionRightBottom"><span class="line"></span></label>
                </div>
                <div class="pipeImg-item">
                    <div class="txt-label">{{=opacityTxt}}:</div>
                    <input class="opacity-range J-opacity" name="opacity" type="range" min="10" max="100" step="1" defaultValue="80" value="80">
                </div>

                <select class="J-select-mark" name="markTxt">
                    <option value="0" selected="selected">{{=showRoomTxt}}</option>
                    <option value="1">{{=companyNameTxt}}</option>
                </select>

                <div class="pipeImg-buttons">
                    <a class="pipeImg-button button-confirm J-button-confirm" href="javascript:void(0)">{{=confirmBtnTxt}}</a>
                    <a class="pipeImg-button button-cancel J-button-cancel" href="javascript:void(0)">{{=cancelBtnTxt}}</a>
                </div>
            </div>

        </div>
        <!-- 批量添加水印 -->
        <div class="pipeImg-panel panel-mark-all J-panel J-mark-all-panel">
            <div class="img-box J-img-box">
                <img class="J-source" src="{{-imgList[0].src}}">
            </div>
            <div class="imgs-thumbnail">
                {{ for(var i=0;i<imgList.length;i++) { }} 
                <div class="img-thumbnail {{=i === 0 ? 'active' : ''}} J-img-thumbnail">
                    <a href="javascript:void(0)">
                        <img src="{{-imgList[i].src}}">
                        <span class="circle"></span>
                    </a>
                </div>

                {{ } }}
            </div>
            <div class="content-footer">
                <div class="pipeImg-item">
                    <div class="txt-label">{{=colorTxt}}:</div> 
                    <input class="J-color" id="colorWhiteAll" type="radio" name="colorAll" value="0" autocomplete="off" hidden>        
                    <label class="color" for="colorWhiteAll"></label>
                    <input class="J-color" id="colorBlackAll" type="radio" name="colorAll" value="1" checked autocomplete="off" hidden>
                    <label class="color color-black" for="colorBlackAll"></label>
                </div>
                <div class="pipeImg-item">
                    <div class="txt-label">{{=positionTxt}}:</div>
                    <input class="J-position" id="positionCenterAll" type="radio" name="positionAll" value="0" autocomplete="off" checked hidden>
                    <label class="position center" for="positionCenterAll"><span class="line"></span></label>
                    <input class="J-position" id="positionLeftTopAll" type="radio" name="positionAll" value="1" autocomplete="off" hidden>
                    <label class="position left-top" for="positionLeftTopAll"><span class="line"></span></label>
                    <input class="J-position" id="positionRightTopAll" type="radio" name="positionAll" value="2" autocomplete="off" hidden>
                    <label class="position right-top" for="positionRightTopAll"><span class="line"></span></label>
                    <input class="J-position" id="positionLeftBottomAll" type="radio" name="positionAll" value="3" autocomplete="off" hidden>
                    <label class="position left-bottom" for="positionLeftBottomAll"><span class="line"></span></label>
                    <input class="J-position" id="positionRightBottomAll" type="radio" name="positionAll" value="4" autocomplete="off" hidden>
                    <label class="position right-bottom" for="positionRightBottomAll"><span class="line"></span></label>
                </div>
                <div class="pipeImg-item">
                    <div class="txt-label">{{=opacityTxt}}:</div>
                    <input class="opacity-range J-opacity" name="opacityAll" type="range" min="10" max="100" step="1" defaultValue="80" value="80">
                </div>

                <select class="J-select-mark" name="markTxtAll">
                    <option value="0" selected="selected">{{=showRoomTxt}}</option>
                    <option value="1">{{=companyNameTxt}}</option>
                </select>
                
            </div>

        </div>
    </div>
    <div class="pipeImg-footer J-pipe-footer">
        <div class="imgs-thumbnail">
            {{ for(var i=0;i<imgList.length;i++) { }} 
            <div class="img-thumbnail {{=i === 0 ? 'active' : ''}} J-img-thumbnail">
                <div class="img-inner">
                    <a href="javascript:void(0)">
                    <img src="{{-imgList[i].src}}">
                    <span class="circle"></span>
                    </a>
                </div>

            </div>

            {{ } }}
        </div>  

        <div class="pipeImg-buttons">
            <a class="pipeImg-button button-confirm J-button-confirm-all" href="javascript:void(0)">{{=saveBtnTxt}}</a>
            <a class="pipeImg-button button-cancel J-button-cancel-all" href="javascript:void(0)">{{=cancelBtnTxt}}</a>
        </div>            
    </div>

</div>

<div class="pipeImg-tip J-pipeImg-tip">
    <div class="pipeImg-tip-header">{{=tipTitleTxt}}</div>
    <div class="pipeImg-tip-main">
        <div class="pipeImg-tip-content">{{=tipContentTxt}}</div>
        <a class="pipeImg-button button-confirm J-tip-confirm" href="javascript:void(0)">{{=tipConfirmBtnTxt}}</a>
        <a class="pipeImg-button button-cancel J-tip-cancel" href="javascript:void(0)">{{=cancelBtnTxt}}</a>        
    </div>
</div>

<div class="pipeImg-progress-bar J-pipeImg-progress">
    <div class="pipeImg-progress-val"></div>
</div>