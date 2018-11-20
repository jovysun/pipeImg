<div class="select">
	<div class="select-title J-select-title">
		<div class="select-selected">
			<span class="J-text">{{=txt}}</span>
		</div>
		<div class="select-arrow J-arrow">
			<i class="ob-icon icon-down"></i>
		</div>
	</div>
	<div class="select-list J-select-list">
		<ul class="select-list-wrap J-select-tab-cnt">
			{{ for(var i=0; i < optionList.length; i++) { }} 
				<li>
					<a href="javascript:void(0)" class="select-opt J-opt {{=optionList[i].selected ? 'selected' : ''}}" data-val="{{=optionList[i].val}}">{{=optionList[i].txt}}</a>
				</li>
			{{ } }}
		</ul>
	</div>
</div>
