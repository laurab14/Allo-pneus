function getURLParam(strParamName){
	var strReturn = "";
	var strHref = window.location.href;
	if ( strHref.indexOf("?") > -1 ){
	  var strQueryString = strHref.substr(strHref.indexOf("?")).toLowerCase();
	  var aQueryString = strQueryString.split("&");
	  for ( var iParam = 0; iParam < aQueryString.length; iParam++ ){
	    if (aQueryString[iParam].indexOf(strParamName.toLowerCase() + "=") > -1 ){
	      var aParam = aQueryString[iParam].split("=");
	      strReturn = aParam[1];
	      break;
	    }
	  }
	}
	var i = 0;
	while (i<10) {
		strReturn = strReturn.replace('+',' ');
		i++;
	}
	return unescape(trim(strReturn));
} 

function trim(str, chars) {
    return ltrim(rtrim(str, chars), chars);
}

function explode( delimiter, string ) {
    // http://kevin.vanzonneveld.net
    // +   original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // +   improved by: kenneth
    // +   improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // *     example 1: explode(' ', 'Kevin van Zonneveld');
    // *     returns 1: {0: 'Kevin', 1: 'van', 2: 'Zonneveld'}
 
    var emptyArray = { 0: '' };
 
    if ( arguments.length != 2
        || typeof arguments[0] == 'undefined'
        || typeof arguments[1] == 'undefined' )
    {
        return null;
    }
 
    if ( delimiter === ''
        || delimiter === false
        || delimiter === null )
    {
        return false;
    }
 
    if ( typeof delimiter == 'function'
        || typeof delimiter == 'object'
        || typeof string == 'function'
        || typeof string == 'object' )
    {
        return emptyArray;
    }
 
    if ( delimiter === true ) {
        delimiter = '1';
    }
 
    return string.toString().split ( delimiter.toString() );
}

function implode( glue, pieces ) {
    // http://kevin.vanzonneveld.net
    // +   original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // +   improved by: _argos
    // *     example 1: implode(' ', ['Kevin', 'van', 'Zonneveld']);
    // *     returns 1: 'Kevin van Zonneveld'
 
    return ( ( pieces instanceof Array ) ? pieces.join ( glue ) : pieces );
}

function getPageSizeWithScroll(){
	if (window.innerHeight && window.scrollMaxY) {// Firefox
		yWithScroll = window.innerHeight + window.scrollMaxY;
		xWithScroll = window.innerWidth + window.scrollMaxX;
	} else if (document.body.scrollHeight > document.body.offsetHeight){ // all but Explorer Mac
		yWithScroll = document.body.scrollHeight;
		xWithScroll = document.body.scrollWidth;
	} else { // works in Explorer 6 Strict, Mozilla (not FF) and Safari
		yWithScroll = document.body.offsetHeight;
		xWithScroll = document.body.offsetWidth;
  	}
	arrayPageSizeWithScroll = new Array(xWithScroll,yWithScroll);
	//alert( 'The height is ' + yWithScroll + ' and the width is ' + xWithScroll );
	return arrayPageSizeWithScroll;
}

function screenSize() {
  var myWidth = 0, myHeight = 0;
  if( typeof( window.innerWidth ) == 'number' ) {
    //Non-IE
    myWidth = window.innerWidth;
    myHeight = window.innerHeight;
  } else if( document.documentElement && ( document.documentElement.clientWidth || document.documentElement.clientHeight ) ) {
    //IE 6+ in 'standards compliant mode'
    myWidth = document.documentElement.clientWidth;
    myHeight = document.documentElement.clientHeight;
  } else if( document.body && ( document.body.clientWidth || document.body.clientHeight ) ) {
    //IE 4 compatible
    myWidth = document.body.clientWidth;
    myHeight = document.body.clientHeight;
  }
  return [myWidth,myHeight];
}

function scrollXY() {
  var scrOfX = 0, scrOfY = 0;
  if( typeof( window.pageYOffset ) == 'number' ) {
    //Netscape compliant
    scrOfY = window.pageYOffset;
    scrOfX = window.pageXOffset;
  } else if( document.body && ( document.body.scrollLeft || document.body.scrollTop ) ) {
    //DOM compliant
    scrOfY = document.body.scrollTop;
    scrOfX = document.body.scrollLeft;
  } else if( document.documentElement && ( document.documentElement.scrollLeft || document.documentElement.scrollTop ) ) {
    //IE6 standards compliant mode
    scrOfY = document.documentElement.scrollTop;
    scrOfX = document.documentElement.scrollLeft;
  }
  return [ scrOfX, scrOfY ];
}

function bookmark(lien){
	NomSite = lien.getAttribute('title');
	UrlSite = lien.getAttribute('href');
	if(window.sidebar) window.sidebar.addPanel(NomSite,UrlSite,""); //Mozilla, FireFox,...
	else if (document.all) window.external.AddFavorite(UrlSite, NomSite); //Internet explorer Windows
}



