<div class="pipeImg-wrapper J-pipe-wrapper">
    <div class="pipe-header">
        <ul class="menu">
            <li class="item active J-menu-item"><a class="btn J-btn-rotate" href="javascript:void(0)">旋转</a></li>
            <li class="item J-menu-item"><a class="btn J-btn-crop" href="javascript:void(0)">裁剪</a></li>
            <li class="item J-menu-item"><a class="btn J-btn-scale" href="javascript:void(0)">缩放</a></li>
            <li class="item J-menu-item">
                <a class="btn J-btn-mark" href="javascript:void(0)">添加水印</a>
            </li>
            <li class="item J-menu-item">
                <a class="btn J-btn-mark-all" href="javascript:void(0)">批量添加水印</a>
            </li>
        </ul>
        <a class="btn btn-close J-button-close" href="javascript:void(0)">关闭</a>
    </div>
    <div class="pipe-content">
        <!-- 旋转面板 -->
        <div class="panel active J-panel J-rotate-panel">
            <div class="img-box J-img-box">
            </div>
            <div class="content-footer">
                <div class="item">
                    <div class="size">
                        <span class="J-num-width"></span>*<span class="J-num-height"></span>px
                    </div>
                </div>
                <div class="item">
                    <a class="btn btn-rotate J-btn-rotate-left" href="javascript:void(0)">逆时针旋转</a>
                </div>
                <div class="item">
                    <a class="btn btn-rotate J-btn-rotate-right" href="javascript:void(0)">顺时针旋转</a>
                </div>
                <div class="buttons">
                    <a class="button button-main J-button-save" href="javascript:void(0)">保存</a>
                    <a class="button button-reset J-button-reset" href="javascript:void(0)">重置</a>
                </div>
            </div>
        </div>
        <!-- 裁剪面板 -->
        <div class="panel J-panel J-crop-panel">
            <div class="img-box J-img-box J-crop-box">

            </div>
            <div class="content-footer">
                <input class="num-width J-num-width" type="text">
                <label for="fixRatio">约束比例</label>
                <input class="fix-ratio J-fix-ratio" type="checkbox" name="fixRatio">
                <input class="num-height J-num-height" type="text">
                <span class="txt">px</span>

                <div class="buttons">
                    <a class="button button-main J-button-save" href="javascript:void(0)">保存</a>
                    <a class="button button-reset J-button-reset" href="javascript:void(0)">重置</a>
                </div>
            </div>

        </div>
        <!-- 缩放面板 -->
        <div class="panel J-panel J-scale-panel">
            <div class="img-box J-img-box"></div>
            <div class="content-footer">
                <input class="num-width J-num-width" type="text">
                <span class="txt">X</span>
                <input class="num-height J-num-height" type="text">
                <span class="txt">px</span>
                <input class="J-scale-range" type="range" name="scaleRatio" min="1" max="20" step="1" value="20">

                <div class="buttons">
                    <a class="button button-main J-button-save" href="javascript:void(0)">保存</a>
                    <a class="button button-reset J-button-reset" href="javascript:void(0)">重置</a>
                </div>
            </div>

        </div>
        <!-- 添加水印面板 -->
        <div class="panel J-panel J-mark-panel">
            <div class="img-box J-img-box J-mark-box">

            </div>
            <div class="content-footer">
                <div class="item">
                    <label for="color">颜色：</label>
                    <input class="J-color" type="radio" name="color" value="0" autocomplete="off">
                    <input class="J-color" type="radio" name="color" value="1" checked autocomplete="off">
                </div>
                <div class="item">
                    <label for="position">位置：</label>
                    <input class="J-position" type="radio" name="position" value="0" checked autocomplete="off">
                    <input class="J-position" type="radio" name="position" value="1" autocomplete="off">
                    <input class="J-position" type="radio" name="position" value="2" autocomplete="off">
                    <input class="J-position" type="radio" name="position" value="3" autocomplete="off">
                    <input class="J-position" type="radio" name="position" value="4" autocomplete="off">
                </div>
                <div class="item">

                    <label for="opacity">透明度：</label>
                    <input class="J-opacity" name="opacity" type="range" min="0" max="1" step="0.1" value="0.8">
                </div>

                <select class="J-markTxt" name="markTxt">
                    <option value="0" selected="selected">展示厅</option>
                    <option value="1">公司名称</option>
                </select>
                <div class="buttons">
                    <a class="button button-confirm J-button-confirm" href="javascript:void(0)">确定</a>
                    <a class="button button-cancel J-button-cancel" href="javascript:void(0)">取消</a>
                </div>
            </div>

        </div>
        <!-- 批量添加水印面板 -->
        <div class="panel J-panel J-mark-all-panel">
            <div class="img-box J-img-box J-mark-box-all">

            </div>
            <div class="content-footer">
                <div class="item">
                    <label for="colorAll">颜色：</label>
                    <input class="J-color" type="radio" name="colorAll" value="0" autocomplete="off">
                    <input class="J-color" type="radio" name="colorAll" value="1" checked autocomplete="off">
                </div>
                <div class="item">
                    <label for="positionAll">位置：</label>
                    <input class="J-position" type="radio" name="positionAll" value="0" checked autocomplete="off">
                    <input class="J-position" type="radio" name="positionAll" value="1" autocomplete="off">
                    <input class="J-position" type="radio" name="positionAll" value="2" autocomplete="off">
                    <input class="J-position" type="radio" name="positionAll" value="3" autocomplete="off">
                    <input class="J-position" type="radio" name="positionAll" value="4" autocomplete="off">
                </div>
                <div class="item">

                    <label for="opacityAll">透明度：</label>
                    <input class="J-opacity" name="opacityAll" type="range" min="0" max="1" step="0.1" value="0.8">
                </div>

                <select class="J-markTxt" name="markTxtAll">
                    <option value="0" selected="selected">展示厅</option>
                    <option value="1">公司名称</option>
                </select>
                <div class="buttons">
                    <a class="button button-confirm J-button-confirm-all" href="javascript:void(0)">保存</a>
                    <a class="button button-cancel J-button-cancel" href="javascript:void(0)">取消</a>
                </div>
            </div>

        </div>
    </div>
    <div class="pipe-footer J-imgs-thumbnail"></div>
</div>
