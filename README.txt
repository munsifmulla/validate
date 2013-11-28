Validate JS, Ver. 1.1

How to use this.??

--------------------------------------------------------------
1. Create a Div tag
2. Within the Div tag, define p tags
3. Inside of the p tag, place your input Elements
4. Add some of the attributes to your input Elements, viz: data-element, data-felement and data-mandatory

    *. data-element = "input / button" //This is to be defined strictly, this defines the Element as an input Element or the button
    *. data-felement = "name / email / phone / web" , //Define this attribute to identify the tyoe of Validation you want to apply for input Element
    *. data-mandatory = "true/flase", Specify the value for this with true or false to make the Validation for Element compulsory or Not Compulsory

5. You can add any element for Clicking, may not be only the button, But make sure you define the data-element attribute for it and its value set to "button".

--------------------------------------------------------------
EXAMPLE:
--------------------------------------------------------------
<div class = "className">
    <p>
        <input type = "text" data-element = "input" data-felement = "name" data-mandatory = "true"/>
    </p>
    <p>
        <button data-element = "button">Click Me</button>
    </p>
</div>