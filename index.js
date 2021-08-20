let cellData = {
   "sheet1":{},
   "sheet2":{},
   "sheet3":{},
   "sheet4":{}
}

let selectedSheet = "sheet1";
let currentSheetNumber = 1;

$(document).ready(function(){
    for(let i=1;i<=100;i++){
        let ans = "";
        let n = i;
        while(n>0){
            let rem = n%26;
            if(rem==0){
                ans = "Z"+ans;
                n = Math.floor(n/26)-1;
            }else{
                ans = String.fromCharCode(rem - 1 + 65)+ans;
                n  = Math.floor(n/26);  
            }
        }
      
        $(".column-name-container").append(`<div class="col-name-${i} column-name">${ans}</div>`);
        $(".row-name-container").append(`<div class="row-name-${i} row-name">${i}</div>`);
    }
    
    $(".style-icon").click(function(){
        $(this).toggleClass("selected");
    });
    
    for(let i=1;i<=20;i++){
        $(".input-cell-container").append(`<div class="row row-${i}"></div>`);
        for(let j=1;j<=20;j++){
           $(`.row-${i}`).append(`<div id="rowId-${i}-colId-${j}" class="input-cell rowId-${i} colId-${j}"></div>`)
        }
    }
    
    $(".input-cell").dblclick(function(){
        $(".input-cell.selected").removeClass("selected");
        $(this).addClass("selected");
        $(this).attr("contenteditable","true");
        $(this).focus();  
    })
     
    $(".input-cell-container").scroll(function(){
        $(".column-name-container").scrollLeft(this.scrollLeft);
        $(".row-name-container").scrollTop(this.scrollTop);
    })

    // creating separate storage for separate divs
    function createData(name){
        cellData[selectedSheet][name] = {
            text : "",
            "font-weight" : false,
            "font-style" : false,
            "text-decoration" : false,
            "text-align":"left",
            "background-color":"#ffffff",
            "color":"#000000",
            "font-family":"Noto Sans",
            "font-size":"14px"
        }
    }
    function pushInMainDataObject(name,toChange,ToCondition){
        cellData[selectedSheet][name][toChange] = ToCondition;
    }
    function getRandC(){
        let arrClasses = $(".input-cell.selected").attr("class").split(" ");
          let divName = arrClasses[1]+"-"+arrClasses[2];
          return divName;
    }
    function updateCell(currentThis,toChange,ToCondition){    
          let divName = getRandC();
           pushInMainDataObject(divName,toChange,ToCondition);  
    }
    
    $(".input-cell").click(function(){
        $(".input-cell.selected").removeClass("selected");
        $(this).addClass("selected");
        let divName = getRandC();
        let arrSplit = divName.split("-");
        let rowNameNumber = arrSplit[1];let colNameNumber = arrSplit[3];
        $(".current-formula").text($(`.col-name-${colNameNumber}`).text()+$(`.row-name-${rowNameNumber}`).text());   
        if(!(divName in cellData[selectedSheet])){
            createData(divName);
            $(".fa-bold").removeClass("selected");
            $(".fa-italic").removeClass("selected");
            $(".fa-underline").removeClass("selected");
            $(".fa-align-right").removeClass("selected");
            $(".fa-align-center").removeClass("selected");
            $(".fa-align-left").addClass("selected");
            $(".select-family").val("Noto Sans");
            $(".box-color-picker").val("#ffffff");
            $(".text-color-picker").val("#000000");
            $(".select-size").val("14px");
            $(".select-family").css("font-family","Noto Sans");   
        }else{    
            if(cellData[selectedSheet][divName]["font-weight"]==true){
                $(".fa-bold").addClass("selected");
            }else{
                $(".fa-bold").removeClass("selected");
            }
            if(cellData[selectedSheet][divName]["font-style"]==true){
                $(".fa-italic").addClass("selected");
            }else{
                $(".fa-italic").removeClass("selected");
            }
            if(cellData[selectedSheet][divName]["text-decoration"]==true){
                $(".fa-underline").addClass("selected");
            }else{
                $(".fa-underline").removeClass("selected");
            }

            let EleAlign = cellData[selectedSheet][divName]["text-align"];
            if(EleAlign=="left"){
                $(".align-item.selected").removeClass("selected");
                $(".fa-align-left").addClass("selected");
             }else if(EleAlign=="center"){
                $(".align-item.selected").removeClass("selected");
                $(".fa-align-center").addClass("selected");
             }else if(EleAlign=="right"){
                $(".align-item.selected").removeClass("selected");
                $(".fa-align-right").addClass("selected");
             }
             
            $(".select-family").val(cellData[selectedSheet][divName]["font-family"]);
            $(".select-family").css("font-family",cellData[selectedSheet][divName]["font-family"]);
            $(".box-color-picker").val(cellData[selectedSheet][divName]["background-color"]);
            $(".text-color-picker").val(cellData[selectedSheet][divName]["color"]);
            $(".select-size").val(cellData[selectedSheet][divName]["font-size"]);
            
        }
   })

// changing highlight on bold/italic/underline  
    $(".fa-bold").click(function(){
        if($(this).hasClass("selected")){
            $(".input-cell.selected").css("font-weight","bold");
            updateCell(this,"font-weight",true);
        }else{
            $(".input-cell.selected").css("font-weight","");
            updateCell(this,"font-weight",false);
        }
    })
    $(".fa-italic").click(function(){
        if($(this).hasClass("selected")){
            $(".input-cell.selected").css("font-style","italic");
            updateCell(this,"font-style",true);
        }else{
            $(".input-cell.selected").css("font-style","");
            updateCell(this,"font-style",false);
        }
    })
    $(".fa-underline").click(function(){
        if($(this).hasClass("selected")){
            $(".input-cell.selected").css("text-decoration","underline");
            updateCell(this,"text-decoration",true);
        }else{
            $(".input-cell.selected").css("text-decoration","");
            updateCell(this,"text-decoration",false);
        }
    });

 //manipulating alignment properties
    $(".align-item").click(function(){
        $(".align-item.selected").removeClass("selected");
        $(this).addClass("selected");
        let EleAlign = $(this).attr("class").split(" ")[1].split("-")[2];
        let divName = getRandC();
        if(EleAlign=="left"){
           $(".input-cell.selected").css("text-align","left");
           cellData[selectedSheet][divName]["text-align"] = "left";
        }else if(EleAlign=="center"){
           $(".input-cell.selected").css("text-align","center");
           cellData[selectedSheet][divName]["text-align"] = "center";
        }else if(EleAlign=="right"){
            $(".input-cell.selected").css("text-align","right");
            cellData[selectedSheet][divName]["text-align"] = "right";
        }
    });
    
    // color picker manipulations
    $(".fa-fill-drip").click(function(){
        $(".box-color-picker").click();
    });
    $(".box-color-picker").change(function(){
          $(".input-cell.selected").css("background-color",$(this).val());
          let divName = getRandC();
          cellData[selectedSheet][divName]["background-color"] = $(this).val();
    });
    $(".fa-campground").click(function(){
        $(".text-color-picker").click();
    });
    $(".text-color-picker").change(function(){
        $(".input-cell.selected").css("color",$(this).val());
        let divName = getRandC();
        cellData[selectedSheet][divName]["color"] = $(this).val();
    })

    // fontSize and fontType
    $(".select-family").change(function(){
        $(".input-cell.selected").css("font-family",$(this).val());
        let divName = getRandC();
        cellData[selectedSheet][divName]["font-family"] = $(this).val();
        $(".select-family").css("font-family",$(this).val());
    })
    $(".select-size").change(function(){
        $(".input-cell.selected").css("font-size",$(this).val());
        let divName = getRandC();
        cellData[selectedSheet][divName]["font-size"] = $(this).val();
    })
    //store input data
    $(".input-cell").blur(function(){
        $(this).attr("contenteditable","false");
        let divName = getRandC();
        cellData[selectedSheet][divName]["text"] = $(this).text();
    });

    //adding new sheets
    function addListenertoSheets(status){
        if(status==true)
         $(".sheet-tab-container").append(`<div class="sheet-tab sheet${currentSheetNumber}">Sheet-${currentSheetNumber}</div>`); 
    
         $(`.sheet${currentSheetNumber}`).click(function(){
            $(".sheet-tab.selected").removeClass("selected");
            $(this).addClass("selected");
            //setting default properties
            for(let ele in cellData[selectedSheet]){
                $("#"+ele).text("");
                $("#"+ele).css("font-weight","none");
                $("#"+ele).css("font-style","none");
                $("#"+ele).css("text-decoration","none");
                $("#"+ele).css("text-align","left");
                $("#"+ele).css("font-family","Noto Sans");
                $("#"+ele).css("background-color","#ffffff");
                $("#"+ele).css("color","#000000");
                $("#"+ele).css("font-size","14px");  
            
                $(".box-color-picker").val("#ffffff");
                $(".text-color-picker").val("#000000");
                $(".select-size").val("14px");
                $(".select-family").css("font-family","Noto Sans");
                $(".select-family").val("Noto Sans");
            }
             selectedSheet = $(".sheet-tab.selected").attr("class").split(" ")[1];
             console.log(cellData[selectedSheet]);
            for(let ele in cellData[selectedSheet]){
                $("#"+ele).text(cellData[selectedSheet][ele]["text"]);
                $("#"+ele).css("font-weight",cellData[selectedSheet][ele]["font-weight"]);
                $("#"+ele).css("font-style",cellData[selectedSheet][ele]["font-style"]);
                $("#"+ele).css("text-decoration",cellData[selectedSheet][ele]["text-decoration"]);
                $("#"+ele).css("text-align",cellData[selectedSheet][ele]["text-align"]);
                $("#"+ele).css("font-family",cellData[selectedSheet][ele]["font-family"]);
                $("#"+ele).css("background-color",cellData[selectedSheet][ele]["background-color"]);
                $("#"+ele).css("color",cellData[selectedSheet][ele]["color"]);
                $("#"+ele).css("font-size",cellData[selectedSheet][ele]["font-size"]);
                $(".current-formula").text(""); 
            }
        });
    }
    $(".fa-plus-circle").click(function(){
        currentSheetNumber++;
        if(currentSheetNumber<=4){
           addListenertoSheets(true);
        }  
    });
    addListenertoSheets(false);

   $(".input-cell").keyup(function(e){
     $(".formula-input").text($(this).text());
   });
    
  $(".formula-input").keyup(function(e){
      $(".input-cell.selected").text($(this).text());
  })

  //menu items
  $(".menu-item").click(function(){
      $(".menu-item").removeClass("selected");
      $(this).addClass("selected");
      $(".menu-icon-bar").css("display","flex");
      $(".data-container2").css("height","70vh");
  });
  $(".menu-help").click(function(){
      alert("Have a nice day!!!!!");
      $(".menu-icon-bar").css("display","none");
      $(".data-container2").css("height","76vh");
  })
  $(".menu-file").click(function(){
    $(".menu-icon-bar").css("display","none");
    $(".data-container2").css("height","76vh");
    
  })
 
})
