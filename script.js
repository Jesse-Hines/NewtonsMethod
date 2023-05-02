function newtonsMethod() {
    let func = document.getElementById("function").value;
    let guess = parseFloat(document.getElementById("guess").value);
  
    let n = 0;
    let x_n = guess;
    let x_np1 = 0;
    let x_np2 = 0;
    let table = document.getElementById("outputTable").getElementsByTagName('tbody')[0];
    table.innerHTML = "";
  
    // Loop until convergence
    while (true) {
      // Use math.js to get the derivative
      /*
        I tried calculating the derivative manually using the definition, but couldn't get it to work
        I tried just defaulting h to a value like 0.000001. Might go back to this later
      */
      let f = math.parse(func).compile();
      let df = math.derivative(func, 'x').compile();
      x_np1 = x_n - f.evaluate({x: x_n}) / df.evaluate({x: x_n});
  
      // Print current values to table
      let row = table.insertRow();
      let nCell = row.insertCell(0);
      let x_nCell = row.insertCell(1);
      let x_np1Cell = row.insertCell(2);
      nCell.innerHTML = n;
      x_nCell.innerHTML = x_n.toFixed(6);
      x_np1Cell.innerHTML = x_np1.toFixed(6);
  
      // Check for convergence, I used extra decimals to be safe
      if (Math.abs(x_np1 - x_np2) < 0.00000001) {
        break;
      }
  
      // Update variables for next iteration
      n++;
      x_n = x_np1;
      x_np2 = x_np1;
    }
  
    // Display the graph from ploty
let scope = {
    x: math.range(-10, 10, 0.01).toArray(),
    func: func
  };
  let parser = math.parse(scope.func);
  let code = parser.compile();
  let values = scope.x.map(function (x) {
    return code.evaluate({x: x})
  });
  let trace = {
    x: scope.x,
    y: values,
    mode: 'lines'
  };
  let layout = {
    xaxis: {
      title: 'x'
    },
    yaxis: {
      title: 'y',
      range: [-10, 10]
    }
  };
  Plotly.newPlot('outputGraph', [trace], layout);
  
  }
  