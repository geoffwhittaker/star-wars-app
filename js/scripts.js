//G Whittaker Star Wars API, single page app

$( document ).ready(function() {
// set initial state =================================================================
    $('#content').on('click', '#subject a', function(e){
        e.preventDefault();
        let url = ($(this).attr('href'));
        let category = ($(this).text());
        $('#list').html ('<p>loading...</p>');// display loading message 
        $.getJSON( url, function( data ) {
           var newContent='';//create empty string
           var navBtn='';//create empty string
           for (var i = 0; i < data.results.length; i++){// loop through the returned data object
           newContent += '<li><a href="'+ data.results[i].url +  '">' + data.results[i].name + '</a></li>';
           }
           if(data.previous !== null){
            navBtn  += '<p><a id="previous" class="btn btn-primary pull-left" href="'+ data.previous +'">Previous</a></p>';
              };
           if(data.next !== null){
                navBtn  += '<p><a id="next" class="btn btn-success pull-right" href="'+ data.next +'">Next ></a></p>';
              }
           $('#category').html (category);// display the page number     
           $('#pageNum').html ('</b> Page number = 1');// display the page number   
           $('#detail').html ('');// clear the details panel
           $('#list').html ('<ul>' + newContent + '</ul>' + navBtn)// display the first list
          });      
    });// end click function
    


// details handler ========================================================================
    $('#content').on('click', '#list ul li a', function(e){
        e.preventDefault();
        let url = ($(this).attr('href'));
        $('#detail').html ('<p>loading...</p>');
        $.getJSON( url, function( data ) {
 // function for each detail item--------------------------------
            detailItem = function(detailname,detail){
                if(detail !== undefined){
                return newContent+= '<p>' + detailname +' : ' + detail + '</p>';
                    };
            }
           
            let newContent = '';// create empty string
            
            //for (let [key, value] of Object.entries(data)) {  
            //    newContent+= '<p>' + key +' : ' + value + '</p>';
            //  };

            newContent+= '<p><b>Name :' + data.name + '</b></p>';
            detailItem ('Gender', data.gender);
            detailItem ('Birth year', data.birth_year);
            detailItem ('MGLT', data.MGLT);  
            detailItem ('Cargo capacity', data.cargo_capacity);        
            detailItem ('Manufacturer', data.manufacturer);
            detailItem ('Climate', data.climate);
            detailItem ('Diameter', data.diameter);
            detailItem ('Eye colour', data.eye_color);
            detailItem ('Hair colour', data.hair_color);
            detailItem ('Mass', data.mass);
            detailItem ('Skin colour', data.skin_color);
            detailItem ('Consumables', data.consumables);
            detailItem ('Cost in credits', data.cost_in_credits);
            detailItem ('Average lifespan', data.average_lifespan);
            detailItem ('Average height', data.average_height);
            detailItem ('Classification', data.classification);
            detailItem ('Designations', data.designation);
            detailItem ('Hair colours', data.hair_colors);
            detailItem ('Eye colours', data.eye_colors);
            detailItem ('Language', data.language);
            

           $('#detail').html ('<div>' + newContent + '</div>')// add detail content
          }); 
    
      });  
  
      // next and previous handler ========================================================
    $('#content').on('click', '#list p a', function(e){
        e.preventDefault();
        let url = ($(this).attr('href'));
        let category = ($(this).text());
        $('#list').html ('<p>loading...</p>');// display loading message 
        $.getJSON( url, function( data ) {
           var newContent='';//create empty string
           var navBtn='';//create empty string
           for (var i = 0; i < data.results.length; i++){// loop through the returned data object
           newContent += '<li><a href="'+ data.results[i].url +  '">' + data.results[i].name + '</a></li>';
        };// show the previous link, check that it is not on the first page with a null value
           if(data.previous !== null){
            navBtn += '<p><a id="previous" class="btn btn-success pull-left" href="'+ data.previous +'">< Previous</a></p>';
           };
           if(data.next !== null){
             navBtn += '<p><a id="next" class="btn btn-success pull-right" href="'+ data.next +'">Next ></a></p>';
             let page = data.next.substr(data.next.length - 1);// get the last character of the 'next' link
             let actual = page - 1; // subtract 1 from the 'next' page number
             $('#pageNum').html (` Page number = ${actual}`);// show page number
            }else{
                actual = "Last page";// set text
             $('#pageNum').html (` Page number = ${actual}`);// show last page text if 'next' number is null;
            }
           $('#detail').html ('');// clear the details panel
           $('#list').html ('<ul>' + newContent + '</ul>' + navBtn)// add new content data , next 10 listings
          });      
    });// end click function
});// end document ready




