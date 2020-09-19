const codeGenerator = require("./index");

const removeSpacesFromString = (str) => {
   let transformedString = "";
   let retstr = [];
//  regex to identify new lines and tab spaces
   var separators = [' ', '\n','\t'];
   separators.join('|')
   retstr = str.split(new RegExp(separators.join('|'), 'g'));

   for (var i in retstr) {
      if (retstr[i].length > 0)
         if (retstr[i].startsWith('style'))
            transformedString += ` ${retstr[i]}`
         else
            transformedString += `${retstr[i]}`
   }
   // console.log(transformedString)
   return transformedString;
}

// test 1
test('Function should return a string', () => {
   let input = {
      "type": "div",
      "root": true,
      "name": "First Section",
      "style": {
         "color": "#a8a8a8",
         "font-size": "32px",
         "background": "red"
      },
      "children": [

      ]
   }
   expect(typeof codeGenerator(input)).toEqual("string");
});

// test 2
test('Node with no child should be self terminating', () => {
   let input = {
      "type": "div",
      "root": true,
      "name": "First Section",
      "style": {
         "color": "#a8a8a8",
         "font-size": "32px",
         "background": "red"
      },
      "children": [

      ]
   }
   let output = `<FirstSection style={{color:"#a8a8a8",fontSize:"32px",background:"red"}}/>`;
   let expectedOutput = removeSpacesFromString(output)

   let receivedOutput = removeSpacesFromString(codeGenerator(input))
   expect(receivedOutput).toEqual(expectedOutput);
});

// test 3
test('Parent node with childcomponents should have closing tag', () => {
   let input = {
      "type": "div",
      "name": "First Section",
      "style": {
         "color": "#a8a8a8",
         "font-size": "32px",
         "background": "red"
      },
      "children": [
         {
            "type": "div",
            "name": "Second Section",
            "children": []
         }
      ]
   }

   let output = `<FirstSection style={{color:"#a8a8a8",fontSize:"32px",background:"red"}}>
                     < SecondSection />
               </FirstSection >`;
   let expectedOutput = removeSpacesFromString(output)

   let receivedOutput = removeSpacesFromString(codeGenerator(input))
   expect(receivedOutput).toEqual(expectedOutput);
});

// test 4 
test('node with empty style obj should not have style prop', () => {
   let input = {
      "type": "div",
      "name": "First Section",
      "style": {
         "color": "#a8a8a8",
         "font-size": "32px",
         "background": "red"
      },
      "children": [
         {
            "type": "div",
            "name": "Second Section"
         },
         {
            "type": "div",
            "name": "Third Section",
            "style": {}
         }
      ]
   }

   let output = `<FirstSection style={{color:"#a8a8a8",fontSize:"32px",background:"red"}}>
	                  <SecondSection/>
                     <ThirdSection/>
                  </FirstSection>`;
   let expectedOutput = removeSpacesFromString(output)

   let receivedOutput = removeSpacesFromString(codeGenerator(input))
   expect(receivedOutput).toEqual(expectedOutput);
});

// test 5
test('All child components should be rendered(>5)', () => {
   let input = {
      "type": "div",
      "name": "First Section",
      "style": {
         "color": "#a8a8a8",
         "font-size": "32px",
         "background": "red"
      },
      "children": [
         {
            "type": "div",
            "name": "Second Section",
            "children": [
               {
                  "type": "div",
                  "name": "SecondSectionChild1",
                  "style": {
                     "display": "flex",
                     "flex-direction": "row"
                  }
               },
               {
                  "type": "div",
                  "name": "SecondSectionChild2"
               },
               {
                  "type": "div",
                  "name": "SecondSectionChild3",
                  "style": {
                     "display": "flex",
                     "flex-direction": "column"
                  }
               },
               {
                  "type": "div",
                  "name": "SecondSectionChild4",
                  "style": {

                  }
               }
            ]
         },
         {
            "type": "div",
            "name": "Third Section",
            "style": {

            }
         }
      ]
   }


   let output = `<FirstSection style={{color:"#a8a8a8",fontSize:"32px",background:"red"}}>
	                  <SecondSection>
		                  <SecondSectionChild1 style={{display:"flex",flexDirection:"row"}}/>
                        <SecondSectionChild2/>
                        <SecondSectionChild3 style={{display:"flex",flexDirection:"column"}}/>
                        <SecondSectionChild4/>
                     </SecondSection>
                     <ThirdSection/>
                  </FirstSection>`;
   let expectedOutput = removeSpacesFromString(output)

   let receivedOutput = removeSpacesFromString(codeGenerator(input))
   expect(receivedOutput).toEqual(expectedOutput);
});

// test 6
test('All nested child components should be rendered(depth>5) ', () => {
   let input = {
      "type": "div",
      "name": "First Section",
      "style": {
         "color": "#a8a8a8",
         "font-size": "32px",
         "background": "red"
      },
      "children": [
         {
            "type": "div",
            "name": "Second Section",
            "children": [
               {
                  "type": "div",
                  "name": "SecondSectionChild1",
                  "style": {
                     "display": "flex",
                     "flex-direction": "row"
                  }
               },
               {
                  "type": "div",
                  "name": "SecondSectionChild2",
                  "children": [
                     {
                        "type": "div",
                        "name": "SecondSectionChild2Child",
                        "children": [
                           {
                              "type": "div",
                              "name": "SecondSectionChild2ChildChild",
                              "children": [
                                 {
                                    "type": "div",
                                    "name": "SecondSectionChild2ChildChildChild"
                                 }
                              ]
                           }
                        ]
                     }
                  ]
               },
               {
                  "type": "div",
                  "name": "SecondSectionChild3",
                  "style": {
                     "display": "flex",
                     "flex-direction": "column"
                  }
               },
               {
                  "type": "div",
                  "name": "SecondSectionChild4",
                  "style": {

                  }
               }
            ]
         },
         {
            "type": "div",
            "name": "Third Section",
            "style": {

            }
         }
      ]
   }

   let output = `<FirstSection style={{color:"#a8a8a8",fontSize:"32px",background:"red"}}>
	                  <SecondSection>
		                  <SecondSectionChild1 style={{display:"flex",flexDirection:"row"}}/>
                        <SecondSectionChild2>
                           <SecondSectionChild2Child>
                              <SecondSectionChild2ChildChild>
                                 <SecondSectionChild2ChildChild/>
                                 </SecondSectionChild2ChildChild>
                              </SecondSectionChild2Child>
                        </SecondSectionChild2>
                        <SecondSectionChild3 style={{display:"flex",flexDirection:"column"}}/>
                        <SecondSectionChild4/>
                     </SecondSection>
                     <ThirdSection/>
                  </FirstSection>`;
   let expectedOutput = removeSpacesFromString(output)

   let receivedOutput = removeSpacesFromString(codeGenerator(input))
   expect(receivedOutput).toEqual(expectedOutput);
});

