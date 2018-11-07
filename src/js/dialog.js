class Dialog{
    constructor(options) {
        this.template = $('#J-pipeImg-template').html();
        this._init();
    }
    _init() {
        let html = '<div class="pipe-dialog J-pipe-dialog"><div class="pipe-mask J-pipe-mask"></div>'+ this. template +'</div>';
        $('body').append(html);
        
        this.$el = $('.J-pipe-dialog');
        this.$pipeWrapper = this.$el.find('.J-pipe-wrapper');

        this._bind();
    }
    _bind() {
        this.$el.find('.J-button-close').on('click', (e) => {
            this.hide();
        })
    }
    show() {
        this.$el.show();
    }
    hide() {
        this.$el.hide();
    }
}

export {Dialog}
