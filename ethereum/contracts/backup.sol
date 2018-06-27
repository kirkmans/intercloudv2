pragma solidity ^0.4.22;
pragma experimental ABIEncoderV2;

contract main {
    uint index;
    bytes[10] bytesArray;
    
    function addtoArray (string input) public {
        bytes memory temp = bytes(input);
        bytesArray[index] = temp;
        index++;
    }
    
    function getArray () public view returns (string[10]){
        string[10] memory temp;
        string memory temp2;
        
        for (uint p; p<bytesArray.length; p++) {
            //strip 0x from bytesArray[p]
        //    temp2 = string(bytesArray[p]);
        //    temp3 = temp2 << 4;
            temp[p] = string(bytesArray[p])
            
            ;
        }
        return temp;
    }
}