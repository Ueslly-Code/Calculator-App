
        // Get the display element
        const display = document.getElementById('display');

        // Function to append characters to display
        function appendToDisplay(value) {
            display.value += value;
        }

        // Function to clear the display
        function clearDisplay() {
            display.value = '';
        }

        // Function to delete last character
        function deleteLastChar() {
            display.value = display.value.toString().slice(0, -1);
        }

        // Function to calculate the result
        function calculateResult() {
            try {
                // Sanitize the input to prevent malicious code execution
                const sanitizedExpression = display.value.replace(/[^0-9+\-*/.()\s]/g, '');
                
                // Use Function instead of eval for better security
                const result = new Function('return ' + sanitizedExpression)();
                
                // Check if result is valid
                if (isFinite(result)) {
                    display.value = result;
                } else {
                    display.value = 'Error';
                }
            } catch (error) {
                display.value = 'Error';
            }
        }

        // Add keyboard support
        document.addEventListener('keydown', function(event) {
            const key = event.key;
            
            // Number keys and operators
            if (/[\d+\-*/.=]/.test(key)) {
                event.preventDefault();
                if (key === '=') {
                    calculateResult();
                } else {
                    appendToDisplay(key);
                }
            }
            
            // Enter key for calculation
            if (key === 'Enter') {
                event.preventDefault();
                calculateResult();
            }
            
            // Backspace for deletion
            if (key === 'Backspace') {
                event.preventDefault();
                deleteLastChar();
            }
            
            // Escape key to clear
            if (key === 'Escape') {
                event.preventDefault();
                clearDisplay();
            }
        });



