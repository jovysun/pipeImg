<div class="pipeImg-wrapper J-pipe-wrapper">
    <div class="pipe-header">
        <ul class="menu">
            <li class="item J-item active"><a class="btn J-menu-btn" href="javascript:void(0)">{{=rotateMenuTxt}}</a></li>
            <li class="item J-item"><a class="btn J-menu-btn" href="javascript:void(0)">{{=cropMenuTxt}}</a></li>
            <li class="item J-item"><a class="btn J-menu-btn" href="javascript:void(0)">{{=scaleMenuTxt}}</a></li>
            <li class="item J-item J-item-mark">
                <a class="btn J-menu-btn" href="javascript:void(0)">{{=markMenuTxt}}</a>
                <div class="item item-sub">
                    <a class="btn J-menu-btn-sub" href="javascript:void(0)">{{=markAllMenuTxt}}</a>
                </div>
            </li>
            <li class="item J-item J-item-mark-all" style="display:none;">
                <a class="btn J-menu-btn" href="javascript:void(0)">{{=markAllMenuTxt}}</a>
                <div class="item item-sub">
                    <a class="btn J-menu-btn-sub" href="javascript:void(0)">{{=markMenuTxt}}</a>
                </div>
            </li>
        </ul>
        <a class="btn btn-close J-button-close" href="javascript:void(0)">{{=closeBtnTxt}}</a>
    </div>
    <div class="pipe-content">
        <!-- 旋转面板 -->
        <div class="panel active J-panel J-rotate-panel">
            <div class="img-box J-img-box">
                <img class="J-source" src="{{-imgList[0].src}}">
            </div>
            <div class="content-footer">
                <div class="item">
                    <div class="size">
                        <span class="J-num-width"></span>*<span class="J-num-height"></span>px
                    </div>
                </div>
                <div class="item">
                    <a class="btn btn-rotate J-btn-rotate-left" href="javascript:void(0)">{{=turnLeftTxt}}</a>
                </div>
                <div class="item">
                    <a class="btn btn-rotate J-btn-rotate-right" href="javascript:void(0)">{{=turnRightTxt}}</a>
                </div>
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
                <input class="fix-ratio J-fix-ratio J-radio-crop-fix" type="checkbox" name="fixRatio">
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
                <input class="J-scale-range J-range-scale-ratio" type="range" name="scaleRatio" min="1" max="20" step="1"
                    value="20">

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
                    <label for="color">{{=colorTxt}}:</label>
                    <input class="J-color J-radio-mark-color" type="radio" name="color" value="0" autocomplete="off">
                    <input class="J-color J-radio-mark-color" type="radio" name="color" value="1" checked autocomplete="off">
                </div>
                <div class="item">
                    <label for="position">{{=positionTxt}}:</label>
                    <input class="J-position J-radio-mark-position" type="radio" name="position" value="0" checked
                        autocomplete="off">
                    <input class="J-position J-radio-mark-position" type="radio" name="position" value="1" autocomplete="off">
                    <input class="J-position J-radio-mark-position" type="radio" name="position" value="2" autocomplete="off">
                    <input class="J-position J-radio-mark-position" type="radio" name="position" value="3" autocomplete="off">
                    <input class="J-position J-radio-mark-position" type="radio" name="position" value="4" autocomplete="off">
                </div>
                <div class="item">

                    <label for="opacity">{{=opacityTxt}}:</label>
                    <input class="J-opacity J-range-mark-opacity" name="opacity" type="range" min="0" max="1" step="0.1"
                        value="1">
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
                    <label for="colorAll">{{=colorTxt}}:</label>
                    <input class="J-color J-radio-markAll-color" type="radio" name="colorAll" value="0" autocomplete="off">
                    <input class="J-color J-radio-markAll-color" type="radio" name="colorAll" value="1" checked
                        autocomplete="off">
                </div>
                <div class="item">
                    <label for="positionAll">{{=positionTxt}}:</label>
                    <input class="J-position J-radio-markAll-position" type="radio" name="positionAll" value="0"
                        checked autocomplete="off">
                    <input class="J-position J-radio-markAll-position" type="radio" name="positionAll" value="1"
                        autocomplete="off">
                    <input class="J-position J-radio-markAll-position" type="radio" name="positionAll" value="2"
                        autocomplete="off">
                    <input class="J-position J-radio-markAll-position" type="radio" name="positionAll" value="3"
                        autocomplete="off">
                    <input class="J-position J-radio-markAll-position" type="radio" name="positionAll" value="4"
                        autocomplete="off">
                </div>
                <div class="item">

                    <label for="opacityAll">{{=opacityTxt}}:</label>
                    <input class="J-opacity J-range-markAll-opacity" name="opacityAll" type="range" min="0" max="1"
                        step="0.1" value="1">
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