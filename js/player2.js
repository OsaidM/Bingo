
var arr1 = [[],[],[],[],[]]
arr1[0].push(Math.floor(Math.random() * 25)+1)
var bingo1 = ['B','I','N','G','O']
console.log(arr1);



// checking everytime if one of the elements inside this
// matrix equal to this specific rndm number i just generated

function isInside(arr1, number){

    for(var i = 0; i <arr1.length; i++){
        for(j=0; j< 5; j++){
            if (number == arr1[i][j]){
                return true;
            }
        }
    }
    return false;
}

// add the rndm number to
function addToArr(arr1){
   
    for(var i =0; i < arr1.length; i++){
        while(arr1[i].length < 5){
            if(isInside(arr1,number= Math.floor(Math.random() * 25)+1)){
                console.log('its already there');
            }else{
                arr1[i].push(number);
            }
            
        }
    }
    
}

function keepAddingUntillFilled1(){
    for(var i =0; i < arr1.length; i++){
        while(arr1[i].length < 5){
            addToArr(arr1);
        }
        console.log(arr1[i]);
    }
    console.log(arr1);
}

function drawThatMatrix1(arr1){
    var thisRow = '<tr>';
    counter = 0;
    for(var i = 0; i < arr1.length; i++){
        for(var j =0; j<arr1[i].length;j++){
            thisRow += '<td class="player2" style="background-color:'+arrColor[counter]+'";>' + arr1[i][j] + '</td>';
            counter +=1;
        }
        thisRow += '</tr>';
        
        console.log(counter)
    }
    document.getElementById('player2').innerHTML = thisRow ;
}

function changeToMinus(arr1,value){
    for(var i = 0; i < arr1.length;i++){
        for(var j =0; j<arr1[i].length; j++){
            if(arr1[i][j] == value){
                arr1[i][j] = -1;
                return -1;
            }
        }
    }
}

function countRow(arr1){
    rowCount = 0;
    for(var i =0;i < arr1.length;i++){
        var counter = 0;
        for(var j=0;j < arr1[i].length;j++){
            if(arr1[i][j] == -1){
                counter +=1;
            }
        }
        if(counter == 5){
            rowCount += 1;
        }
    }
    return rowCount;
}


function countColumn(arr1){ // this function still not ready trying to think of a way
                            // to count the columns together @_@, oh god how stupid i am right now because im bad at math :(
    var colCount = 0;
    for(var i =0;i < arr1.length;i++){
        var counter = 0;
        for(var j=0;j < arr1[i].length;j++){
            if(arr1[j][i] == -1){
                counter +=1;
            }
        }
        if(counter == 5){
            colCount += 1;
            counter = 0;
        }
    }
    return colCount;
}

function countCross1(arr1){
        var crossCount = 0;
        var counter = 0;
        for(var i =0;i < arr1.length;i++){
            if(arr1[i][i] == -1){
                counter += 1;
            }
            
            if(counter == 5){
                crossCount += 1;
            }
        }
        
        counter = 0;
        for(var i = arr1.length-1, j=0; i >= 0; i--, j++){
            if(arr1[j][i] == -1){
                counter += 1;
                console.log('anything',counter);
            }
            if (counter == 5){
                crossCount += 1;
            }
        }

        
    return crossCount;
}



function winCondition1(arr1,bingo1){
    numberOfRows = countRow(arr1);
    console.log('number of rows',numberOfRows);
    numberOfColumns = countColumn(arr1);
    console.log('number of columns',numberOfColumns);
    numberOfCross = countCross1(arr1)
    sumOfColumnsRowsCross = numberOfRows + numberOfColumns + numberOfCross;
    for(var i=0;i < sumOfColumnsRowsCross; i++){ //this way does some duplications in the HTML Page
                                                 // i suggest you use array of ones and zeros to solve that 
        if(sumOfColumnsRowsCross < 5){
            bingo1[i] = '<s>' + bingo1[i] + '</s>';
        }else{
            window.location = 'win2.html';
            break;
        }
    }

    return bingo1;
}


function addTdListners1(arr1,bingo1){
    var x = document.getElementsByClassName("player2");
    console.log(x[0]);
    
    for(var i =0; i<x.length;i++){
        x[i].addEventListener("click", function(){

            x = changeToMinus(arr1, this.innerHTML);
            lastPickedValue = this.innerHTML;
            if(Boolean(this.getAttribute("Picked"))){
                boxesCount-=1;
            }
            document.getElementsByClassName('lastPickedNumber')[0].innerHTML = lastPickedValue;
            // this.innerHTML = '<s>'+ this.innerHTML +'</s>';
            this.style.opacity = '0.2'
            this.setAttribute('Picked', true);
            console.log(arr1,'im hereeeee'); 
            y = winCondition1(arr1,bingo1);
            x = document.getElementById('bingo1');
            for(var i =0; i < bingo1.length; i++){
                x.innerHTML = y
            }
            
            // this if statement responsible to make the switch between the players
            // when they pick thier two boxes
            if(boxesCount < 2 && turnStatus == 1){
                boxesCount+=1;
                if(boxesCount == 2){
                    turnStatus = 0;
                    document.getElementsByClassName('tb1')[0].style.display = '';
                    document.getElementsByClassName('tb2')[0].style.display = 'none';
                    boxesCount = 0;
                    lastPickedValue = 0
                }
            }
            document.getElementsByTagName('label')[0].innerHTML= ''
        });
        x[i].addEventListener("mouseover", function(){ this.style.backgroundColor = this.style.backgroundColor; this.style.boxShadow = '0px 0px 3px 2px black';this.style.borderRadius = '5px'});
        x[i].addEventListener("mouseout", function(){ this.style.backgroundColor = this.style.backgroundColor; this.style.boxShadow = ''; this.style.borderRadius = ''});
    }
}



keepAddingUntillFilled1();
drawThatMatrix1(arr1);
addTdListners1(arr1,bingo1);

