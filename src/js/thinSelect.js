import tpl from './thinSelect.tpl';
class ThinSelect{
    constructor(options) {
        let defaults = {
            el: '',
            template: tpl,
        };
        options = Object.assign({}, defaults, options);
        this.el = options.el;
        this.template = options.template;
        this.$el = $(this.el);

        this.selectObj = {
            'txt': '',
            'optionsObj': []
        };
        this._init();
    }
    _init() {
        
        this.$el.find('option').each((index, element) => {
            let $option = $(element);
            let selected = $option.prop('selected');
            let optionVal = $option.val();
            let optionTxt = $option.text();
            let optionObj = {
                'val': optionVal,
                'txt': optionTxt,
                'selected': selected
            };
            if (selected) {
                this.selectObj.txt = optionTxt;
            }
            
            this.selectObj.optionsObj.push(optionObj);
        });

        let templateHtml = template(this.template, {
            'txt': this.selectObj.txt,
            optionList: this.selectObj.optionsObj
        });


        this.$el.hide();
        $(templateHtml).insertBefore(this.$el);
        this.$thinSelect = this.$el.prev();

        this._bind();
    }
    _bind() {
        this.$thinSelect.find('.J-select-title').on('click', (e) => {
            e.stopPropagation();
            let $list = this.$thinSelect.find('.J-select-list');
            if($list.is(':visible')){
                $list.hide();
                this.$thinSelect.find('.J-arrow').removeClass('active');
            }else{
                $list.show();
                this.$thinSelect.find('.J-arrow').addClass('active');
            }
        })
        this.$thinSelect.find('.J-opt').on('click', (e) => {
            e.stopPropagation();
            let txt = $(e.target).addClass('selected').text();
            this.$thinSelect.find('.J-text').text(txt);

            this.$thinSelect.find('.J-select-list').hide();
            this.$thinSelect.find('.J-arrow').removeClass('active');

            this.$activeItem = $(e.target).parent();
            this.$activeItem.siblings().find('.J-opt').removeClass('selected');

            this._updateSource();
        })

        $(document).on('click.thinSelect', (e) => {
            this.$thinSelect.find('.J-select-list').hide();     
            this.$thinSelect.find('.J-arrow').removeClass('active');     
        })
    }
    
    _updateSource() {
        let index = this.$activeItem.index();
        this.$el.find('option').eq(index).prop('selected', true);
        this.$el.trigger('change');
    }
    destroy() {
        $(document).off('click.thinSelect');
        this.$thinSelect.remove();
    }
}

ThinSelect.use = (el) => {
    if (!el) {
        throw new Error('ThinSelect: el is not found!');
    }
    $(el).each((index, element) => {
        new ThinSelect({'el': element});
    })
}

export default ThinSelect
