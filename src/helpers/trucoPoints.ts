
export const addPoint = (array: any) => {
   let flatArray = array.flat();
   let lastNumber = flatArray[flatArray.length - 1];
   let number = lastNumber < 5 ? lastNumber+1 : 1;

   if(array.length > 0){
      if(array[array.length - 1].length === 5){
         array.push([number])
      }else{
         array[array.length - 1].push(number);
      }
   }else{
      array.push([number]);
   }

   return array;
}

export const deletePoint = (array : any) => {
   if(array.length === 0) return array;
   if(array[array.length-1].length === 1){
      array.pop();
   }else{
      array[array.length-1].pop();
   }
   return array;
}