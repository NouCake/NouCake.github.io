
/**
 * pol1, poly2 : array of vertecies
 */
checkCollision = function(pol1, pol2){

	getAxis = function(pol){
		for(let i = 1; i < pol.length; i++){
			axis.push({y: pol[i].x-pol[i-1].x, x: pol[i].y-pol[i-1].y})
		}
		axis.push({y: pol[0].x-pol[pol.length-1].x, x: pol[0].y-pol[pol.length-1].y})
	}

	cleanAxis = function(ax){
		for(let i = 0; i < ax.length-1; i++){
			for(let a = i+1; a < ax.length; a++){
				if(ax[a].x != 0){
					if(ax[i].x / ax[a].x * ax[a].y == ax[i].y){
						ax.splice(a,1);
						a--;
					}
				} else {
					if(ax[i].y / ax[a].y * ax[a].x == ax[i].x){
						ax.splice(a,1);
						a--;
					}
				}
			}
		}
	}

	dotProduct = function(a, b){
		return a.x * b.x + a.y * b.y;
	}

	getMagnitude = function(vec){
		return Math.sqrt((vec.x*vec.x) + (vec.y*vec.y));
	}

	checkIntersection = function(min1, max1, min2, max2, ax){
		return max1 >= min2 && min1 <= max2;
	}

	getMinMax = function(ax){

		min1 = max1 = dotProduct(pol1[0], ax) / getMagnitude(ax);
		for(let i = 1; i < pol1.length; i++){
			let proj = dotProduct(pol1[i], ax) / getMagnitude(ax);
			if(proj > max1){
				max1 = proj;
			}
			if(proj < min1){
				min1 = proj;
			}
		}

		min2 = max2 = dotProduct(pol2[0], ax) / getMagnitude(ax);
		for(let i = 0; i < pol2.length; i++){
			let proj = dotProduct(pol2[i], ax) / getMagnitude(ax);
			if(proj > max2){
				max2 = proj;
			}
			if(proj < min2){
				min2 = proj;
			}
		}

		return checkIntersection(min1, max1, min2, max2);
	}

	let axis = [];
	getAxis(pol1);
	getAxis(pol2);
	cleanAxis(axis);
	for(let i = 0; i < axis.length; i++){
		if(!getMinMax(axis[i])) {
			return false;
		}
	}
	return true;
}