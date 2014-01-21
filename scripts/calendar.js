var selectedElement;
$(document).ready(function(){
	var deep=0;

/** ------ Header icons event   ------*/

	$("body").on('click',".actionHeaderIcons",function() {
		var action=$(this).attr("title");
		switch(action){
			case "Close" : 
				$("#datePicker").animate({"height":"0px"},500, function(){$("#datePicker").remove()}); 
				break;
			case "Minimize" : 
				$("#tableInside").slideUp("500"); 
				$(this).attr("src","./images/calendar/maximize.png");
				$(this).attr("title","Maximize");
				break;
			case "Maximize" : 
				$("#tableInside").slideDown('500'); 
				$(this).attr("src","./images/calendar/minimize.png");
				$(this).attr("title","Minimize");
				break;
			case "Refresh" : 
				var date= new Date();
				var day= date.getDate();
				var month= date.toUTCString().split(" ")[2];
				var year= date.toUTCString().split(" ")[3];
				$("#monthYear").text(monthName(month)+" "+year);
				calendar(year,month,day);
				deep=0;
				break;
		}
	});

/** ------ Left and right arrows for month,year changing   ------*/

	$("body").on('click',".arrowsAside",function(){
		if(deep==0){
			switch($(this).attr("title").split(" ")[0]){
				case "Previous" : 
					var year=$("#monthYear").text().split(" ")[1];
					var month=$("#monthYear").text().split(" ")[0].substring(0,3);
					month=previousMonth(month);
					month == "Dec" ? year=year-1 : year=year;
					$("#monthYear").text(monthName(month)+" "+year);
					calendar(year,month,0);
					break;
				case "Next" : 
					var year=$("#monthYear").text().split(" ")[1];
					var month=$("#monthYear").text().split(" ")[0].substring(0,3);
					month=nextMonth(month);
					month == "Jan" ? year=parseInt(year)+1 : year=year;
					$("#monthYear").text(monthName(month)+" "+year);
					calendar(year,month,0);
					break;
			}
		}
		else if(deep==1){
			switch($(this).attr("title").split(" ")[0]){
				case "Previous" : 
					var curentYear=parseInt($("#monthYear").text());
					if(curentYear==1900){
						break;
					}
					$("#monthYear").text(curentYear-1);
					break;
				case "Next" : 
					var curentYear=parseInt($("#monthYear").text());
					if(curentYear==2100){
						break;
					}
					$("#monthYear").text(curentYear+1);
					break;
			}
		}
		else if(deep==2){
			switch($(this).attr("title").split(" ")[0]){
				case "Previous" : 
					var yearStart= parseInt($("#monthYear").text().split(" - ")[0])-10;
					if(yearStart == 1890){
						break;
					}
					$("#monthYear").text(yearStart+" - "+(yearStart+9));
					showInThisDec(yearStart);
					break;
				case "Next" : 
					var yearStart= parseInt($("#monthYear").text().split(" - ")[0])+10;
					if(yearStart == 2100){
						break;
					}
					$("#monthYear").text(yearStart+" - "+(yearStart+9));
					showInThisDec(yearStart);
					break;
			}
		}
		else if(deep==3){
			switch($(this).attr("title").split(" ")[0]){
				case "Previous" : 
					var yearStart= parseInt($("#monthYear").text().split(" - ")[0])-100;
					if(yearStart == 1800){
						break;
					}
					$("#monthYear").text(yearStart+" - "+(yearStart+99));
					showInThisCen(yearStart);
					break;
				case "Next" : 
					var yearStart= parseInt($("#monthYear").text().split(" - ")[0])+100;
					if(yearStart == 2100){
						break;
					}
					$("#monthYear").text(yearStart+" - "+(yearStart+99));
					showInThisCen(yearStart);
					break;
			}
		}
	});

/** ------ Selecting date   ------*/

	$("body").on('click',"#calendarContent td",function(){
		var clas=$(this).attr('class');
		if(clas=="thisMonth"){
			$("#calendarContent td").removeClass("active");
			$(this).addClass("active");
			var year=$("#monthYear").text().split(" ")[1];
			var month=$("#monthYear").text().split(" ")[0];
			var day=$(this).text();
			//var element=
			$("#"+selectedElement).val(year+" - "+month.substring(0,3)+" - "+day);
			$("#datePicker").animate({"opacity":"0"},600,function(){$("#datePicker").remove()});
			$("#"+selectedElement).blur();
		}
	});

/** ------ Showing months in selected year, always same    ------*/

	$("body").on('click',".monthsInYear",function(){
		var month=$(this).text();
		var year= $("#monthYear").text();
		$("#monthYear").text(monthName(month)+" "+year);
		calendar(year,month,0);
		deep=0;
	});

/** ------ Show all years in selected decade    ------*/

	$("body").on('click',".yearsInThisDec",function(){
		var year= $(this).text();
		$("#monthYear").text(year);
		showMonthsInYear();
		deep=1;
	});

/** ------ Show all decades in selected century    ------*/

	$("body").on('click',".decInThisCen",function(){
		var year= $(this).text();
		$("#monthYear").text(year);
		showInThisDec(year.split(" - ")[0]);
		deep=2;
	});

/** ------ Scrolling event on calendar for FIREFOX  ------*/

	$("body").on('DOMMouseScroll',"#calendarContent", function(e){
		if(e.originalEvent.detail > 0) {
			if(deep==0){
		 		var year=$("#monthYear").text().split(" ")[1];
				var month=$("#monthYear").text().split(" ")[0].substring(0,3);
				month=previousMonth(month);
				month == "Dec" ? year=year-1 : year=year;
				$("#monthYear").text(monthName(month)+" "+year);
				calendar(year,month,0);
			}
			else if(deep==1){}
			else if(deep==2){
				var year=parseInt($("#monthYear").text().split(" - ")[0])+10;
				$("#monthYear").text(year+" - "+(year+9));
				showInThisDec(year);
			}
			else if(deep==3){

				var year=parseInt($("#monthYear").text().split(" - ")[0])+100;
				if(year<2100){
					$("#monthYear").text(year+" - "+(year+99));
					showInThisCen(year);
				}
			}
		}
		else {
			if(deep==0){
				var year=$("#monthYear").text().split(" ")[1];
				var month=$("#monthYear").text().split(" ")[0].substring(0,3);
				month=nextMonth(month);
				month == "Jan" ? year=parseInt(year)+1 : year=year;
				$("#monthYear").text(monthName(month)+" "+year);
				calendar(year,month,0);
			}
			else if(deep==1){}
			else if(deep==2){
				var year=parseInt($("#monthYear").text().split(" - ")[0])-10;
				$("#monthYear").text(year+" - "+(year+9));
				showInThisDec(year);
			}
			else if(deep==3){
				var year=parseInt($("#monthYear").text().split(" - ")[0])-100;
				if(year>=1900){
					$("#monthYear").text(year+" - "+(year+99));
					showInThisCen(year);
				}
			}
		}
	 	return false;
 	});

/** ------ Scrolling event on calendar for Opera,Safari,Chrome and IE  ------*/

	$("body").on('mousewheel',"#calendarContent", function(e){
		if(e.originalEvent.wheelDelta < 0) {
			if(deep==0){
				var year=$("#monthYear").text().split(" ")[1];
				var month=$("#monthYear").text().split(" ")[0].substring(0,3);
				month=previousMonth(month);
				month == "Dec" ? year=year-1 : year=year;
				$("#monthYear").text(monthName(month)+" "+year);
				calendar(year,month,0);
			}
			else if(deep==1){}
			else if(deep==2){
				var year=parseInt($("#monthYear").text().split(" - ")[0])-10;
				$("#monthYear").text(year+" - "+(year+9));
				showInThisDec(year);
			}
			else if(deep==3){
				var year=parseInt($("#monthYear").text().split(" - ")[0])-100;
				if(year>=1900){
					$("#monthYear").text(year+" - "+(year+99));
					showInThisCen(year);
				}
				
			}
			
		}else {
			if(deep==0){
				var year=$("#monthYear").text().split(" ")[1];
				var month=$("#monthYear").text().split(" ")[0].substring(0,3);
				month=nextMonth(month);
				month == "Jan" ? year=parseInt(year)+1 : year=year;
				$("#monthYear").text(monthName(month)+" "+year);
				calendar(year,month,0);
			}
			else if(deep==1){}
			else if(deep==2){
				var year=parseInt($("#monthYear").text().split(" - ")[0])+10;
				$("#monthYear").text(year+" - "+(year+9));
				showInThisDec(year);
			}
			else if(deep==3){

				var year=parseInt($("#monthYear").text().split(" - ")[0])+100;
				if(year<2100){
					$("#monthYear").text(year+" - "+(year+99));
					showInThisCen(year);
				}
			}
		}
		return false;
 	});

/** ------ Changing 'month year' content for showing year in next decade or century   ------*/

	$("body").on('click',"#monthYear", function(){
 		if(deep==0){
	 		var year=$(this).text().split(" ")[1];
	 		$(this).text(year);
	 		showMonthsInYear();
	 		deep=1;
 		}
 		else if(deep==1){
 			var year=parseInt(parseInt($(this).text())/10);
 			var number=year/10;
 			var text=year*10+" - "+(year*10+9);
 			$(this).text(text);
 			showInThisDec(year*10);
 			deep=2;
 		}
 		else if(deep==2){
 			var year=parseInt(parseInt($(this).text())/100);
 			var number=year/100;
 			var text=year*100+" - "+(year*100+99);
 			$(this).text(text);
 			showInThisCen(year*100);
 			deep=3;
 		}
 	});


});

function calendar(Y, M, D){
	var date= new Date();
	if(Y===0){
		var month= date.toUTCString().split(" ")[2];
		var year= date.toUTCString().split(" ")[3];
	}
	else{
		var month= M;
		var year= Y;
	}
	var curentMonth= realMonthNumber(month);
	var allDays= numberOfDay(month,year);
	var daysPreviousMonth= numberOfDay(previousMonth(month),year);
	var string="<thead id='tableHead'><th>Mon</th><th>Tue</th><th>Wed</th><th>Thu</th><th>Fri</th><th>Sat</th><th>Sun</th></thead>";
	var lasDayInMonth=numberOfDayNumber(curentMonth,year);
	var yearOfPreviousMonth=realMonthNumber(previousMonth(month))==12 ? year-1 : year;
	var dateBegin= new Date(yearOfPreviousMonth,realMonthNumber(previousMonth(month)) ,1,0,0,0,0);
	var firstDay= dayNumber(dateBegin.toUTCString().split(",")[0]);
	
	var prevMonth=previousMonth(month);
	var dayInPreviousMonth=numberOfDay(prevMonth,yearOfPreviousMonth);
	var daysFromNextMonth=1;
	var daysInPreviousMonth=1;
	var dayInFirstWeek=8 - firstDay;
	
	for (var i = 0; i < 6; i++) {
		string+="<tr>";
		if(i==0){
			for (var j = dayInPreviousMonth - firstDay + 1 ; j <= dayInPreviousMonth; j++) {
				string+="<td class='notThisMonth'>"+j;
				string+="</td>";
			}
			for (var j = 1; j <= 7 - firstDay ; j++) {
				string+="<td class='thisMonth'>"+j;
				string+="</td>";
			}
		}
		else{
			for (var j = 0; j < 7; j++) {
				if(lasDayInMonth < dayInFirstWeek ){
					string+="<td class='notThisMonth'>"+daysFromNextMonth++;
					string+="</td>";
				}
				else{
					string+="<td class='thisMonth'>"+dayInFirstWeek++;
					string+="</td>";
				}
			}

		}
		string+="</tr>";
	}
	
	$("#calendarContent").html(string);
}

function numberOfDay(month, year){
	if(year%4==0){
		switch(month){
			case "Jan" : case "Mar" : case "May" : case "Jul" : case "Aug" : case "Oct" : case "Dec" : return 31;
			case "Feb" : return 29;
			case "Apr" : case "Jun" : case "Sep" : case "Nov" : return 30;
		}
	}
	else{
		switch(month){
			case "Jan" : case "Mar" : case "May" : case "Jul" : case "Aug" : case "Oct" : case "Dec" : return 31;
			case "Feb" : return 28;
			case "Apr" : case "Jun" : case "Sep" : case "Nov" : return 30;
		}
	}
}

function numberOfDayNumber(month, year){
	if(year%4==0){
		switch(month){
			case 1: case 3: case 5: case 7: case 8: case 10: case 12: return 31;
			case 2: return 29;
			case 4: case 6: case 9: case 10: return 30;
		}
	}
	else{
		switch(month){
			case 1: case 3: case 5: case 7: case 8: case 10: case 12: return 31;
			case 2: return 28;
			case 4: case 6: case 9: case 10: return 30;
		}
	}
}

function previousMonth(month){
	switch(month){
		case "Jan" : return "Dec";
		case "Feb" : return "Jan";
		case "Mar" : return "Feb";
		case "Apr" : return "Mar";
		case "May" : return "Apr";
		case "Jun" : return "May";
		case "Jul" : return "Jun";
		case "Aug" : return "Jul";
		case "Sep" : return "Aug";
		case "Oct" : return "Sep";
		case "Nov" : return "Oct";
		case "Dec" : return "Nov";
	}
}

function nextMonth(month){
	switch(month){
		case "Jan" : return "Feb";
		case "Feb" : return "Mar";
		case "Mar" : return "Apr";
		case "Apr" : return "May";
		case "May" : return "Jun";
		case "Jun" : return "Jul";
		case "Jul" : return "Aug";
		case "Aug" : return "Sep";
		case "Sep" : return "Oct";
		case "Oct" : return "Nov";
		case "Nov" : return "Dec";
		case "Dec" : return "Jan";
	}
}

function monthNumber(month){
	switch(month){
		case "Jan" : return 0;
		case "Feb" : return 1;
		case "Mar" : return 2;
		case "Apr" : return 3;
		case "May" : return 4;
		case "Jun" : return 5;
		case "Jul" : return 6;
		case "Aug" : return 7;
		case "Sep" : return 8;
		case "Oct" : return 9;
		case "Nov" : return 10;
		case "Dec" : return 11;
	}
}

function monthName(month){
	switch(month){
		case "Jan" : return "January";
		case "Feb" : return "February";
		case "Mar" : return "March";
		case "Apr" : return "April";
		case "May" : return "May";
		case "Jun" : return "June";
		case "Jul" : return "July";
		case "Aug" : return "August";
		case "Sep" : return "September";
		case "Oct" : return "October";
		case "Nov" : return "November";
		case "Dec" : return "December";
	}
}

function shortMonthName(month){
	switch(month){
		case 0: return "Jan";
		case 1: return "Feb";
		case 2: return "Mar";
		case 3: return "Apr";
		case 4: return "May";
		case 5: return "Jun";
		case 6: return "Jul";
		case 7: return "Aug";
		case 8: return "Sep";
		case 9: return "Oct";
		case 10: return "Nov";
		case 11: return "Dec";
	}
}

function numberOfWeeks(month, year){
	var dateBegin= new Date(year,month,1,0,0,0,0);
	var firstDay=0;
	switch(dateBegin.toUTCString().split(",")[0]){
		case "Mon": firstDay= 7; break;
		case "Tue": firstDay= 6; break;
		case "Wed": firstDay= 5; break;
		case "Thu": firstDay= 4; break;
		case "Fri": firstDay= 3; break;
		case "Sat": firstDay= 2; break;
		case "Sun": firstDay= 1; break;
	}

	var lastDay=0;
	var last=numberOfDayNumber(month,year);
	var dateEnd= new Date(year,month,last,0,0,0,0);
	switch(dateEnd.toUTCString().split(",")[0]){
		case "Mon": lastDay= 1; break;
		case "Tue": lastDay= 2; break;
		case "Wed": lastDay= 3; break;
		case "Thu": lastDay= 4; break;
		case "Fri": lastDay= 5; break;
		case "Sat": lastDay= 6; break;
		case "Sun": lastDay= 7; break;
	}

	if(firstDay + lastDay > 7){
		var different= (last - firstDay - lastDay) % 7 == 0 ? (last - firstDay - lastDay) / 7 + 1 : (last - firstDay - lastDay) / 7;
	}
	else{
		var different= (last - firstDay - lastDay) % 7 == 0 ? (last - firstDay - lastDay) / 7 + 2 : (last - firstDay - lastDay) / 7;
	}
	return different;
}

function dayNumber(day){
	var firstDay = 0;
	switch(day){
		case "Mon": firstDay= 1; break;
		case "Tue": firstDay= 2; break;
		case "Wed": firstDay= 3; break;
		case "Thu": firstDay= 4; break;
		case "Fri": firstDay= 5; break;
		case "Sat": firstDay= 6; break;
		case "Sun": firstDay= 0; break;
	}
	return firstDay;
}

function realMonthNumber(month){
	switch(month){
		case "Jan" : return 1;
		case "Feb" : return 2;
		case "Mar" : return 3;
		case "Apr" : return 4;
		case "May" : return 5;
		case "Jun" : return 6;
		case "Jul" : return 7;
		case "Aug" : return 8;
		case "Sep" : return 9;
		case "Oct" : return 10;
		case "Nov" : return 11;
		case "Dec" : return 12;
	}
}

function showInThisDec (year) {
	var output="";
	var start= parseInt(parseInt(year)/10)*10;
	var first=0;
	for (var i = start - 1; i <= start + 10; i++, first++) {
		first % 4 == 0 ? output += "<tr>" : output += "";
		output+="<td";
		first==0? output+=" class='notThisMonth'": output+="" ;
		i==start+10? output+=" class='notThisMonth'": output+=" class='yearsInThisDec'";
		output+=">"+i+"</td>";
		first % 4 == 3 ? output += "</tr>" : output += "";
	}
	$("#calendarContent").html(output);
}

function showInThisCen (years) {
	var output="";
	var start= years;
	var first=0;
	for (var i = start - 10; i <= start + 100; i += 10, first++) {
		if(start>2000){
			if(i<start+100){
				first % 4 == 0 ? output += "<tr>" : output += "";
				output+="<td";
				first==0? output+=" class='notThisMonth'": output+="" ;
				i==start+100? output+=" class='notThisMonth'": output+=" class='decInThisCen'";
				output+=">"+i+" - "+(i+9)+"</td>";
				first % 4 == 3 ? output += "</tr>" : output += "";
			}
			else{
				output += "</tr>";
			}
		}
		else{
			first % 4 == 0 ? output += "<tr>" : output += "";
			output+="<td";
			first==0? output+=" class='notThisMonth'": output+="" ;
			i==start+100? output+=" class='notThisMonth'": output+=" class='decInThisCen'";
			output+=">"+i+" - "+(i+9)+"</td>";
			first % 4 == 3 ? output += "</tr>" : output += "";
		}
	}
	$("#calendarContent").html(output);
}

function showMonthsInYear(){
	var output="";
	for (var i = 0; i < 12; i++) {
		i % 4 == 0 ? output += "<tr>" : output += "";
		output+="<td class='monthsInYear'>"+shortMonthName(i)+"</td>";
		i % 4 == 3 ? output += "</tr>" : output += "";
	};
	$("#calendarContent").html(output);
}

function showCalendar($this){
	selectedElement=$this.attr('id');
	var left=$this.offset().left ;
	var top= $this.offset().top;
	var outputString='<div id="datePicker" style="position:absolute;top:'+(top+30)+'px;left:'+left+'px;z-index:2000"><div id="calendarHeader"><div id="calendarTitle" title="Calendar"><img src="./images/calendar/calendar.png" alt="calendar icon"/><span>Calendar</span></div><img src="./images/calendar/close.png" alt="close icon" title="Close" class="actionHeaderIcons"/><img src="./images/calendar/minimize.png" alt="minimize icon" title="Minimize" class="actionHeaderIcons"/><img src="./images/calendar/refresh.png" alt="refresh icon" title="Refresh" class="actionHeaderIcons"/></div><div id="tableInside"><div id="dateChanger"><span id="leftArrow" class="arrowsAside" title="Previous month" unselectable="on"> < </span> <div id="monthYear">January 2014</div><span id="rightArrow" class="arrowsAside" title="Next month" unselectable="on"> > </span> </div><table id="calendarContent" cellspacing="0px" border="1"></table></div></div>';
	$this.parent().append(outputString);
	calendar(0,0,0);
}