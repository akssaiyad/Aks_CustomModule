define([
  'jquery',
], 
	function($){ 
		$(document).ready(function() {	
			var documentheight=1;
			var scrolldata=0;
			var different_height=0;
			var current_document_height=0;
			var start_document_height =0;
			var array_page= new Array();
			var new_document = 0;
		    var check = $("#infi").attr('class');	  
			if (check != "0") 
		    {
		    	var flag = "yes";
				var link = "";
				var moveToLink = "";
				var nextPageNo = 1;			
			    var counter = $("#pageTotal").val();
				var curPageLink = $("#pageLinkUrl").val();
			    var isPageShow = $("#showPage").val();
			    var infoStyle = $("#infoBarStyle").val();
			    var isShowInfo = $("#isShowInfo").val();
			    var groupType = $("#groupType").val();
		    	var page = 1;
		    	var curPage = 1;
		    	var totalPage = counter;
				var dom = groupType.split(",");
				var whereToAppend = "";
		    	array_page.push({Link:curPageLink,Page_number:documentheight});
				var isPage = curPageLink.indexOf("?");
				for (var i = 0; i < dom.length; i++) {
					if ($(".column.main "+dom[i])[0]) {
						whereToAppend = dom[i];
					}
				}
				function ChangeUrl(page, url) {
			        if (typeof (history.pushState) != "undefined") {
			            var obj = { Page: page, Url: url };
			            history.pushState(obj, obj.Page, obj.Url);
			        } 
			    }
				whereToAppend = whereToAppend.concat(" ol li:last");

		    	$(".page-products .products + .toolbar .pages").css("display", "none");
		    	$(".page-products .toolbar .toolbar-amount").css("display", "none");

		    	if (isShowInfo == 1) 
		    	{
		    		if (totalPage == 1) 
		    		{
			    		$("<div id = 'showInfo' style = '"+infoStyle+"' >Showing <span> "+curPage+"</span> of <span> "+totalPage+"</span> Page</div>").insertAfter(".products.wrapper ol:last");			    		
		    		}
		    		else
		    		{
			    		$("<div id = 'showInfo' style = '"+infoStyle+"' >Showing <span> "+curPage+"</span> of <span> "+totalPage+"</span> Pages</div>").insertAfter(".products.wrapper ol:last");			    		
		    		}
		    	}

			    if (counter == 1 || counter == 0)
				{
					$("#btnNext").hide();
				}
			    counter = counter - 1;

				if (check == "2") 
			    {
			    	$("#btnNext").click(function()
			    	{			   
			    				
				    	$("#imageLoader").css("display", "block");				    	
						curPage = curPage + 1;
				    	if (isPage == "-1")
				    	{
				    		link = curPageLink+'?p=';				    		
				    	}
				    	else{
				    		link = curPageLink+'&p=';
				    	}	   	
				    	--counter;
				    	nextPageNo++;
				    	moveToLink = link+nextPageNo;
				    	$.ajax({
					        type: "POST",
					        url: moveToLink,
					        data: { infinite: 1 },
					        success: function(result) {
				    			$("#imageLoader").css("display", "none");	

				    			$("#showInfo").remove();				        	
				    			scrolldata=1;
				    			documentheight++;
				    			var newlink="";
				    			var sublink="";
				    			var sublinkArray ="";
				    			sublink = moveToLink.substr(moveToLink.indexOf("?") + 1)
				    			sublinkArray = sublink.split('&');
				    			newlink = moveToLink.replace(sublinkArray[0]+'&', "");
				    			array_page.push({Link:newlink,Page_number:documentheight});
				    			console.log(result);
					        	htmlObject=$($(result).find("ol.products li")).insertAfter(whereToAppend);
					        	htmlObject.find('[data-role=tocart-form], .form.map.checkout').attr('data-mage-init', JSON.stringify({'catalogAddToCart': {}}));             
								htmlObject.trigger('contentUpdated');
					        	
						    	if (isShowInfo == 1) 
						    	{
						    		$("<div id = 'showInfo' style = '"+infoStyle+"' >Showing <span> "+curPage+"</span> of <span> "+totalPage+"</span> Pages</div>").insertAfter(".products.wrapper ol:last");						    		
						    	}
		        
					        } 
					    });
				    	if (counter == 0)
				    	{
				    		$("#btnNext").hide();
				    	}
				    });
			    }

			    if (check == "1") 
			    {	
			    	var m = 0;    	
			    	$(window).scroll(function() {  
					   if($(window).scrollTop() + $(window).height() == ($(document).height() - m)){
					   	m = 1;
						   	if (flag == "yes") 
						   	{
						       if(curPage < totalPage){
						       		curPage = curPage + 1;
						       		$("#imageLoader").css("display", "block");
							    	if (isPage == "-1")
							    	{
							    		link = curPageLink+'?p=';				    		
							    	}
							    	else{
							    		link = curPageLink+'&p=';
							    	}	   	
							    	--counter;
							    	nextPageNo++;
							    	moveToLink = link+nextPageNo;
							    	flag = "no";						    	
							    	$.ajax({
								        type: "POST",
								        url: moveToLink,
								        success: function(result) {
							    			$("#imageLoader").css("display", "none");	

							    			$("#showInfo").remove();
							    			
							    			scrolldata=1;
							    			documentheight++;
							    			var newlink="";
							    			var sublink="";
							    			var sublinkArray ="";
							    			sublink = moveToLink.substr(moveToLink.indexOf("?") + 1)
							    			sublinkArray = sublink.split('&');
							    			newlink = moveToLink.replace(sublinkArray[0]+'&', "");
							    			array_page.push({Link:newlink,Page_number:documentheight});
								        	htmlObject=$($(result).find("ol.products li")).insertAfter(whereToAppend);
								        	htmlObject.find('[data-role=tocart-form], .form.map.checkout').attr('data-mage-init', JSON.stringify({'catalogAddToCart': {}}));             
											htmlObject.trigger('contentUpdated');

									    	if (isShowInfo == 1) 
									    	{
									    		$("<div id = 'showInfo' style = '"+infoStyle+"' >Showing <span> "+curPage+"</span> of <span> "+totalPage+"</span> Pages</div>").insertAfter(".products.wrapper ol:last");								    		
									    	}		        
								        },
								        complete: function(result){
								        	flag = "yes";
								        }
								    });
						       }
						    }					       
						    
					   }
					});
			    }

			    start_document_height = $(".products.list.items.product-items").height();
			    $(window).scroll(function() {
			    	if(documentheight == 2){
			    		new_document =$(".products.list.items.product-items").height(); 
			    		different_height= new_document - start_document_height;
			    	}
			    	current_document_height =$(window).scrollTop();
		    		var page_number = current_document_height/different_height;
		    		var final_page_number = Math.ceil(page_number);
		    		sublink = moveToLink.substr(moveToLink.indexOf("?") + 1)
					sublinkArray = sublink.split('&');
					newlink = moveToLink.replace(sublink, "p="+final_page_number);
					if(scrolldata==1){
						$.each(array_page, function(index, val){
						    if(val['Page_number'] == final_page_number){
						    	newlink = moveToLink.replace(sublink, "p="+val['Page_number']);
						    	ChangeUrl(curPageLink,newlink);
						    }
						});
					}
			    });
			    $("#toTop").css('display','none');
				$(window).on("scroll", function() {
					var scrollHeight = $(window).scrollTop();
			    	if(scrollHeight > 0){
			    		$("#toTop").css('display','block');
			    	}
			    	else{
			    		$("#toTop").css('display','none');
			    	}
				});
				
			    $("#toTop").click(function () {
				   $("html, body").animate({scrollTop: 0}, 1000);
				});
			}
	    });
	});