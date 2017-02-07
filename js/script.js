$(document).ready(function(){
	var items = $('#gallery li');
	itemsByTag = {};

	// looping through tags

	items.each(function(i){
		var elem = $(this),
		tag = elem.data('tag').split(',');
		// tag array is created based on the number of data-tag the element had
		elem.attr('data-id',i);
		//Add attribute for quicksand
		$.each(tag,function(key,value){
			// iterating through the tag array
			// key being index of the array elements
			// value being the array element itself
			value = $.trim(value);
			// to avoid repitition of nav elements
			if(!(value in itemsByTag)){
				// to create an empty array if not present
				itemsByTag[value] = [];
			}
			// images are moved to the respective category
			itemsByTag[value].push(elem);
		});
	});

	// Create All Items option
	createList('All Items',items);

	$.each(itemsByTag,function(k,v){
		createList(k,v);
		// k being index of the array inside object (key)
		// v being the array itself (value)
	});

	// Click Handler
	$('#navbar a').on('click', function(){
		var link = $(this);

		//Active class
		link.addClass('active').siblings().removeClass('active');

		$('#gallery').quicksand(link.data('list').find('li'));
	});

	//Create the list
	function createList(text, items){
		//Create an empty unordered list
		var ul = $('<ul>',{'class':'hidden'});
		$.each(items, function(){		
			$(this).clone().appendTo(ul)
		});

		//Add gallery div
		ul.appendTo('#gallery');

		var a = $('<a>',{
			html:text,
			href:'#',
			data:{list:ul}
		}).appendTo('#navbar');
	}
});