// name of the team and elemebnt (group_one or group_two)
function getTeamLogo(name,elem)
{
	var tname1 = getObjects(team_json_data, 'name',name)[0];
			if(tname1!=undefined)
			{
				var parentone = elem.parent();
				parentone.find('img').attr('src',tname1.url);
			 
			}
}

function event_check_first(obj_name)
{
	return true;
}

function event_display()
{
	if (!swfaddress_on_display.event)
	{		
		swfaddress_on_display.event = true;
		$('#check_out_now_btn').css('display', 'none');
		$('#event').css('display', '');		
		TweenMax.to($('#event'), .2, { autoAlpha:1 } );
	}
}

function event_undisplay()
{
	if (swfaddress_on_display.event)
	{
		swfaddress_on_display.event = false;

		TweenMax.to($('#event'), .2, { autoAlpha:0, onComplete:function(){$('#event').css('display', 'none'); }} );
	}
}


function event_select_click(my_event)
{
	if (glb_current_event)
	{
		//console.log(parseInt(glb_current_event['@id']));
		rpc_call("get_game_availability", true, event_get_availability_result, parseInt(glb_current_event['@id']));
	}
}



function event_get_availability_result(result)
{
	section_update_availability(result);
	filter_populate_price_scale_checklist();
	filter_price_slider_drag();
	//**section_set_color();
	
	//console.log(glb_current_event.availability);
	swfaddress_set_value([level_overview.level_name]);
}

function event_test_click(my_event)
{
	rpc_call("test_api", true, event_test_result);
}

function event_test_result(result)
{
	console.log(result);
}


function event_game_list_populate2()
{
	$("#heading_one").css("display", "none");
	var day_container = $('#day_container');
	day_container.empty();
	var frag = document.createDocumentFragment();
	

	
	var i = 0;
	var month_list = [];
	for (var m in game_list_month_array)
	{
		
		
		for (var d in game_list_month_array[m])
		{
			i++;

			var game = game_list_month_array[m][d];
			if (month_list.indexOf(game.month_name)== -1)
			{
			month_list.push(game.month_name);
			}
			if(month_list[0]==game.month_name){
			var split_str	=	 game.publicDescription.split("vs");
			
			//if(split_str.length>1){
			
			var day_item = document.querySelector('#template_container>.day_item').cloneNode(true);	
			
			var date_tf = day_item.querySelector('.date');
			date_tf.innerHTML = ((parseInt(d)+1)+ ' ' + game.month_name);
			frag.appendChild(day_item);
			
			
			var time_tf = day_item.querySelector('.time');
			
			time_tf.innerHTML = game.time;
			
			
			var description_tf = day_item.querySelector('.group_one');
			
			description_tf.innerHTML = split_str[0];
			getTeamLogo(split_str[0].trim(),$('.group_one'));
			
			var description_ts = day_item.querySelector('.group_two');
			
			description_ts.innerHTML = split_str[1];
			getTeamLogo(split_str[1].trim(),$('.group_two'));
			
			day_item.style.cursor = 'pointer';
			day_item.setAttribute('event_key', m + ':' + d);
			
			day_item =	$(day_item);
			day_item.on('click', event_click_handler);
		
			if (game == glb_current_event)
			{
				day_item.addClass('selected');
			}
			
			/*return false;
			
			
			var date_tf = day_item.querySelector('.date');
			date_tf.innerHTML = (game.month_name.substr(0, 3) + '<br/>' + (parseInt(d)+1));
			
			frag.appendChild(day_item);
				
			var description_tf = day_item.querySelector('.day_item_description');
			console.log(description_tf);
			
			description_tf.innerHTML = game.list_description;
		
			day_item.style.cursor = 'pointer';
			day_item.setAttribute('event_key', m + ':' + d);
			
			day_item =	$(day_item);
			day_item.on('click', event_click_handler);
		
			if (game == glb_current_event)
			{
				day_item.addClass('selected');
			}
			
			if (i % 2 == 0)
			{
				day_item.addClass('alternate_color');
			}*/
			//}
			}
		}
		
		
		
		
	}
	
	
	/*for(var k=0;k<month_list.length;k++){
	$( "#month_list" ).append('<li class=""> <a href="javascript:void(0);" onclick="event_game_list_populate1(\'' + month_list[k] + '\');">'+month_list[k]+'</a></li>');
	}*/
	
	day_container[0].appendChild(frag);

	TweenMax.to($('#day_container'), .2, {delay:.2, autoAlpha:1});
	
     
		$("#calendar").flipster({
			style:							'carousel', // Switch between 'coverflow' or 'carousel' display styles
			start: 							'center', // Starting item. Set to 0 to start at the first, 'center' to start in the middle or the index of the item you want to start with.
			
			enableKeyboard: 		true, // Enable left/right arrow navigation
			enableMousewheel: 	true, // Enable scrollwheel navigation (up = left, down = right)
			enableTouch: 				true, // Enable swipe navigation for touch devices
			
			enableNav: 					true, // If true, flipster will insert an unordered list of the slides
			enableNavButtons: 	true, // If true, flipster will insert Previous / Next buttons
			
			onItemSwitch: 			function(){}, // Callback function when items are switches
		 
				});		
				
		 $(window).resize(function(){
			 //$('#calendar ul').css('width','auto');
			 $('.flipto-next').click();
			 $('.flipto-prev').click();
			 });
	
	
}


function event_game_list_populate()
{
	var calendar = $("#calendar");
	var parent = $("#calendar").parent();
	
	calendar.remove(); 
	 var cal = $("<div>",{id: "calendar"});	 
	 var day_cont = $("<ul>", {id:"day_container"}).appendTo(cal);
	 parent.append(cal);
	var day_container = $('#day_container');
	day_container.empty();
	var frag = document.createDocumentFragment();
	
	var i = 0;j=0;count=1;
	
	for (var m in game_list_month_array)
	{
		
		for (var d in game_list_month_array[m])
		{
			i++; 
			var game = game_list_month_array[m][d];
			
			
			var split_str	=	 game.publicDescription.split("vs");
			
			
			
			var day_item = document.querySelector('#template_container>.day_item').cloneNode(true);	
			day_item.setAttribute('id',"Item"+count);
			day_item.setAttribute('data-flip-category',game.month_name);
			day_item.setAttribute('title',d);
			var date_tf = day_item.querySelector('.date');
			date_tf.innerHTML = (game.month_name + ' ' + (parseInt(d)+1));
			frag.appendChild(day_item);
			
			
			var time_tf = day_item.querySelector('.time');
			
			time_tf.innerHTML = game.time;
			
			var description_tf = day_item.querySelector('.group_one');
			if (split_str[0]==undefined){
				split_str[0]="";
			}
			else if (split_str[1]==undefined) {split_str[1]="";}
				

			description_tf.innerHTML = split_str[0];
			getTeamLogo(split_str[0].trim(),$('.group_one'));
			var description_ts = day_item.querySelector('.group_two');
			
			description_ts.innerHTML = split_str[1];
			getTeamLogo(split_str[1].trim(),$('.group_two'));
			
			day_item.style.cursor = 'pointer';
			day_item.setAttribute('event_key', m + ':' + d);
			
			day_item =	$(day_item);
			day_item.on('click', event_click_handler);
		
			if (game == glb_current_event)
			{
				day_item.addClass('selected');
			}
			
			
			
			
			count++;
		}
	}
	
	
	
	
	day_container[0].appendChild(frag);
	 var calendar = $("#calendar"); 
	calendar.flipster({
			style:							'carousel', // Switch between 'coverflow' or 'carousel' display styles
			start: 							'center', // Starting item. Set to 0 to start at the first, 'center' to start in the middle or the index of the item you want to start with.
			
			enableKeyboard: 		true, // Enable left/right arrow navigation
			enableMousewheel: 	true, // Enable scrollwheel navigation (up = left, down = right)
			enableTouch: 				true, // Enable swipe navigation for touch devices
			
			enableNav: 					true, // If true, flipster will insert an unordered list of the slides
			enableNavButtons: 	true, // If true, flipster will insert Previous / Next buttons
			
			onItemSwitch: 			function(){}, // Callback function when items are switches
		 
				});		
				
		 $(window).resize(function(){
			 //$('#calendar ul').css('width','auto');
			 $('.flipto-next').click();
			 $('.flipto-prev').click();
			 });

	TweenMax.to($('#day_container'), .2, {delay:.2, autoAlpha:1});
	
     
		
	
	
}


/*
function event_prev_click(my_event)
{
	if (game_list_month_array[event_current_month-1])
	{
		TweenMax.to($('#day_container'), .2, {autoAlpha:0});
		event_current_month--;
		event_game_calendar_populate(event_current_month);
	}
}

function event_next_click(my_event)
{
	if (game_list_month_array[event_current_month+1])
	{
		TweenMax.to($('#day_container'), .2, {autoAlpha:0});
		event_current_month++;
		event_game_calendar_populate(event_current_month);
	}
}

function event_game_calendar_populate(month)
{
	event_current_month = month;
	var month_length = glb_month_size_array[month];
	var year = (month < 12) ? glb_year : glb_year + 1;
	
	if ((!game_list_month_array[month] || game_list_month_array[month].length == 0)  && 
		month < game_list_month_array.length - 1)
	{
		event_game_calendar_populate(month+1);
	}
	else
	{
		var week = 0;
		var weekday = glb_first_weekday;
		var i = 0;
		var day_total = weekday;

		for (i = glb_month; i < month; i++)
		{
			day_total += glb_month_size_array[i];
		}
		
		weekday = day_total % 7;

		var t = glb_month_num_to_name[month%12] + "  ";
		t += (month < 12) ? glb_year : (glb_year + 1);
		$('#event_calendar_month_name').html(t);
		
		$('#day_container').empty();
		var row = document.querySelector('#template_container>.calendar_row').cloneNode(true);	
		var frag = document.createDocumentFragment();
		frag.appendChild(row);
		
		for (i = 0; i < weekday; i++)
		{	
			row.appendChild(document.createElement('div'));
		}
		
		
		for (i = 0; i < month_length; i++)
		{		
			
			var day_item = document.querySelector('#template_container>.day_item').cloneNode(true);	
			
			var date_tf = day_item.querySelector('.day_item_date');
			date_tf.innerHTML = (i+1);
			
			row.appendChild(day_item);
				
			if (game_list_month_array[month] && game_list_month_array[month][i])
			{
				var game = game_list_month_array[month][i];
				
				var opponent_tf = day_item.querySelector('.day_item_opponent');
				//opponent_tf.innerHTML = game.Opponent;
				var time_tf = day_item.querySelector('.day_item_time');
				time_tf.innerHTML = game.time;
				time_tf.style.visibility = 'visible';
				day_item.style.cursor = 'pointer';
				day_item.setAttribute('event_key', month + ':' + i);
				
				day_item =	$(day_item);
				day_item.on('click', event_click_handler);
			
				if (game == glb_current_event)
				{
					day_item.addClass('selected');
				}
				
			}

			weekday++;
			if (weekday > 6)
			{
				weekday = 0;
				row = document.querySelector('#template_container>.calendar_row').cloneNode(true);	;
				frag.appendChild(row);
			}
		}
		document.getElementById('day_container').appendChild(frag);
	}
	
		

//	TweenMax.to(ui_game_calendar_mc.bg, .2, {height:ui_game_calendar_mc.day_container_mc.y + ui_game_calendar_mc.day_container_mc.height + 4});
	TweenMax.to(	$('#day_container'), .2, {delay:.2, autoAlpha:1});
}

*/
function event_click_handler(my_event)
{ 
	$("#heading_one").css("display", "block");
	var event_obj = my_event.delegateTarget;
	var event_key = event_obj.getAttribute('event_key').split(':');
	glb_current_event = game_list_month_array[parseInt(event_key[0])][parseInt(event_key[1])]
//	console.log(glb_current_event);
	//$('.event_description').html(glb_current_event.full_description);
	$('#header_text').html(glb_current_event.header_description).addClass('event_description');
	$('.day_item.selected').removeClass('selected');
	$(event_obj).addClass('selected');
	$('#event_select_btn').removeClass('disabled');
	
	
	if (glb_current_event)
	{
		//console.log(parseInt(glb_current_event['@id']));
		rpc_call("get_game_availability", true, event_get_availability_result, parseInt(glb_current_event['@id']));
	}
}

/*

function startup_game_calendar(result_obj)
{
	
	global_error_alert("Game data loaded.");
	var json_string = result_obj.game_list_obj;
	json_string = json_string.replace(/(\w+\()/, "");
	json_string = json_string.replace(/\);?\s*$/, "");
	try
	{
		game_list_array = JSON.decode(json_string);
	}
	catch (e)
	{
		global_error_alert(json_string);
		throw(e);
	}
	game_list_month_array = [];
	var day = 0;
	
	glb_month_name_to_num = {January:0, February:1, March:2, April:3, May:4, June:5, July:6, August:7, September:8, October:9, November:10, December:11};
	glb_month_num_to_name = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
	
//result_obj.day = int(result_obj.day) +  13;

	for (var i = 0; i <  game_list_array.Qcue.length; i++ )
	{
		
		//bt(i);
		var skip = false;
		var game = game_list_array.Qcue[i];
		var date  = game.EventDate;
		var month_day_year = date.match(/(\w+), (\w+) (\d+), (\d+)/);
		var weekday_name = month_day_year[1];
		var month = month_day_year[2];
		var year = month_day_year[4];
		
		
		if (i == 0)
		{
			//bt ( (int(month_day_year[3]) <= int(result_obj.year))  + ", " + (int(glb_month_name_to_num[month_day_year[2]]) < int(result_obj.month)) + ", " + (int(month_day_year[2]) < int(result_obj.day)));
			if (int(year) <= int(result_obj.year) &&
				int(glb_month_name_to_num[month_day_year[2]]) < int(result_obj.month) &&
				int(month_day_year[3]) < int(result_obj.day))
			{
				game_list_array.Qcue.shift();
				skip = true;
				i--;
			}
			else
			{
				glb_first_game = game;
			}
		}
		
		if (!skip)
		{
			day = int(month_day_year[3]) - 1;
			
			var suffix = "th";
			if (day % 10 == 0 && day != 10)
			{
				suffix = "st";
			}
			else if (day % 10 == 1 && day != 11)
			{
				//suffix = "nd";
				suffix = "nd";
			}
			else if (day % 10 == 2 && day != 12)
			{
				suffix = "rd";
			}
			game.suffix = suffix;
			
			game.month_name = month;
			game.day = day;
			
			month = glb_month_name_to_num[month];
			
			game.ymd_date = year + "/" + (leading_zero(month + 1)) + "/" + (leading_zero(day + 1));
			
			game.month_num = month;
			game.year = year;
			game.weekday = weekday_name;
			
			if (game_list_month_array.length > month+1 || year > result_obj.year)
			{
				month += 12; 
			}
			while(game_list_month_array.length <= month)
			{
				game_list_month_array.push([]);
			}
			
			game.ticket_class_array = { };
			for (var j in game.Prices)
			{
				var tc = game.Prices[j];
				//var tc_name = tc.TicketClassName;
				var tc_name = tc.PriceLevelName;
				game.ticket_class_array[tc_name] = tc;
			}
			game_list_month_array[month][day] = game;
		}
	}

	
	glb_month_size_array = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31, 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
	glb_month = int(result_obj.month)-1;
	glb_year = int(result_obj.year);
	ui_current_month = glb_month;
	var next_year = glb_year+1;
	
	if (Boolean(int(result_obj.leap_year)))
	{
		glb_month_size_array[1] = 29;
	}
	else if((next_year % 400 == 0) || ((next_year % 100 != 0) && (next_year % 4 == 0)))
	{
		glb_month_size_array[13] = 29;
	}

	var weekday = int(result_obj.weekday);
	day = int(result_obj.day);
	while (day > 1)
	{
		day--;
		weekday--;
		if (weekday < 0)
		{
			weekday = 6;
		}
	}

	glb_first_weekday = weekday;
	
	global_error_alert("Game data processed.");
	
	if (startup_assets_loaded)
	{
		startup_init_part_3();
	}
	else
	{
		dynamic_pricing_load_complete = true;
	}
}

function ui_game_calendar_next_click(my_event)
{
	if (game_list_month_array[ui_current_month+1])
	{
		TweenMax.to(ui_game_calendar_mc.day_container_mc, .2, {autoAlpha:0});
		ui_current_month++;
		ui_game_calendar_populate(ui_current_month);
	}
}

function ui_game_calendar_prev_click(my_event)
{
	if (game_list_month_array[ui_current_month-1])
	{
		TweenMax.to(ui_game_calendar_mc.day_container_mc, .2, {autoAlpha:0});
		ui_current_month--;
		ui_game_calendar_populate(ui_current_month);
	}
}


function ui_game_calendar_populate(month)
{
	ui_current_month = month;
	var month_length = glb_month_size_array[month];
	var year = (month < 12) ? glb_year : glb_year + 1;
	if ((!game_list_month_array[month] || game_list_month_array[month].length == 0)  && 
		month < game_list_month_array.length - 1)
	{
		ui_game_calendar_populate(month+1);
	}
	else
	{
		var week = 0;
		var weekday = glb_first_weekday;
		var i = 0;
		var day_total = weekday;

		for (i = glb_month; i < month; i++)
		{
			day_total += glb_month_size_array[i];
		}
		
		weekday = day_total % 7;

		ui_game_calendar_mc.month_tf.text = glb_month_num_to_name[month%12] + "  ";
		if (month < 12)
		{
			ui_game_calendar_mc.month_tf.text += glb_year;
		}
		else
		{
			ui_game_calendar_mc.month_tf.text += (glb_year + 1);
		}

		for (i = 0; i < 31; i++)
		{		
			var day_item = ui_game_calendar_mc.day_container_mc.getChildAt(i);
			day_item.x = (day_item.width+1) * weekday + 3;
			day_item.y = (i < month_length) ? (day_item.height+1) * week : 0;
			day_item.day_tf.text = i+1;
	
			day_item.visible = (i < month_length);
	
			if (day_item.team_logo)
			{
				day_item.bitmap.visible = false;
			}
			
			if (game_list_month_array[month] && game_list_month_array[month][i])
			{
				var game = game_list_month_array[month][i];
				day_item.opponent_tf.text = game.Opponent;
				day_item.time_tf.text = game.EventTime;
				day_item.game_data = game;
				day_item.ymd_date = game.ymd_date;
				day_item.mouseEnabled = true;
				
				
				if (day_item.team_logo)
				{
					var team_name = game.Opponent.toLowerCase().replace(" ", "_");
					day_item.team_name = team_name;
					
					var team_logo_obj = object_array.team_logo_array[team_name];
					if (team_logo_obj && !team_logo_obj.no_image && !team_logo_obj.loading)
					{
						var bitmap = day_item.bitmap;
						bitmap.bitmapData = team_logo_obj.bitmap_data;
						bitmap.width = day_item.logo_guide.width;
						bitmap.height = day_item.logo_guide.height;
						bitmap.scaleX = bitmap.scaleY = (bitmap.scaleX < bitmap.scaleY) ? bitmap.scaleX : bitmap.scaleY;
						bitmap.visible = true;
					}
					else if (!team_logo_obj)
					{
						object_array.team_logo_array[team_name] = {bitmap_data:null, no_image:false, loading:true, day_item_array:[day_item]};
						load_asset(["img/team_logo/" + team_name + ".png"], [team_name + "_logo_" + i], ui_team_logo_load_complete, [team_name], "non_null");
						game.team_logo = object_array.team_logo_array[team_name];
					}
					else if (team_logo_obj.loading)
					{
						team_logo_obj.day_item_array.push(day_item);
					}
					
				}
			}
			else
			{
				day_item.opponent_tf.text = "";
				day_item.time_tf.text = "";
				day_item.game_data = null;
				day_item.mouseEnabled = false;
			}
			
			weekday++;
			if (weekday > 6)
			{
				weekday = 0;
				week++;
			}
		}
	}

	TweenMax.to(ui_game_calendar_mc.bg, .2, {height:ui_game_calendar_mc.day_container_mc.y + ui_game_calendar_mc.day_container_mc.height + 4});
	TweenMax.to(ui_game_calendar_mc.day_container_mc, .2, {delay:.2, autoAlpha:1});
}

function ui_team_logo_load_complete(logo, team_name)
{
	
	var team_logo_obj = object_array.team_logo_array[team_name];
	if (logo)
	{
		team_logo_obj.bitmap_data = logo.bitmapData.clone();
		
		for (var i in team_logo_obj.day_item_array)
		{
			var day_item = team_logo_obj.day_item_array[i];

			if (team_name == day_item.team_name)
			{
				var bitmap = day_item.bitmap;
				bitmap.bitmapData = team_logo_obj.bitmap_data;
				bitmap.width = day_item.logo_guide.width;
				bitmap.height = day_item.logo_guide.height;
				bitmap.scaleX = bitmap.scaleY = (bitmap.scaleX < bitmap.scaleY) ? bitmap.scaleX : bitmap.scaleY;
				bitmap.visible = true;
			}
		}
	}
	else
	{
		team_logo_obj.no_image = true;
	}
	
	team_logo_obj.loading = false;
}

*/

// Get the url of the logos of the team from team_json_data json object
