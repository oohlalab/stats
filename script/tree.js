const decisionTree = {
  question: "What is your primary goal?",
  options: [
    {
      text: "Compare groups or conditions",
      next: {
        question: "How many groups are you comparing?",
        options: [
          {
            text: "Two groups",
            next: {
              question: "Are the groups independent or paired/matched?",
              options: [
                {
                  text: "Independent",
                  next: {
                    question: "What type of data do you have?",
                    options: [
                      {
                        text: "Continuous (interval/ratio)",
                        next: {
                          question: "Are data normally distributed?",
                          options: [
                            {
                              text: "Yes, and equal variances",
                              result: "Independent t-test",
                            },
                            {
                              text: "No/non-parametric",
                              result: "Mann-Whitney U test",
                            },
                            {
                              text: "Unequal variances",
                              result: "Welch's t-test",
                            },
                          ],
                        },
                      },
                      {
                        text: "Categorical (nominal/ordinal)",
                        next: {
                          question: "What analysis type?",
                          options: [
                            {
                              text: "Goodness of fit",
                              result: "Chi-square goodness of fit",
                            },
                            {
                              text: "Association between variables",
                              next: {
                                question: "Sample size?",
                                options: [
                                  {
                                    text: "Large (expected counts ≥5)",
                                    result: "Chi-square test",
                                  },
                                  {
                                    text: "Small (expected counts <5)",
                                    result: "Fisher's exact test",
                                  },
                                ],
                              },
                            },
                          ],
                        },
                      },
                      {
                        text: "Time-to-event/survival",
                        result: "Log-rank test",
                      },
                    ],
                  },
                },
                {
                  text: "Paired/matched",
                  next: {
                    question: "Data type?",
                    options: [
                      {
                        text: "Continuous",
                        next: {
                          question: "Normally distributed differences?",
                          options: [
                            { text: "Yes", result: "Paired t-test" },
                            { text: "No", result: "Wilcoxon signed-rank test" },
                          ],
                        },
                      },
                      {
                        text: "Categorical",
                        result: "McNemar's test",
                      },
                    ],
                  },
                },
              ],
            },
          },
          {
            text: "Three or more groups",
            next: {
              question: "Group relationships?",
              options: [
                {
                  text: "Independent groups",
                  next: {
                    question: "Data type?",
                    options: [
                      {
                        text: "Continuous",
                        next: {
                          question: "Normality assumption met?",
                          options: [
                            { text: "Yes", result: "ANOVA" },
                            { text: "No", result: "Kruskal-Wallis test" },
                          ],
                        },
                      },
                      {
                        text: "Categorical",
                        result: "Chi-square test of independence",
                      },
                    ],
                  },
                },
                {
                  text: "Repeated measures/related groups",
                  next: {
                    question: "Data type?",
                    options: [
                      {
                        text: "Continuous",
                        next: {
                          question: "Normally distributed?",
                          options: [
                            { text: "Yes", result: "Repeated measures ANOVA" },
                            { text: "No", result: "Friedman test" },
                          ],
                        },
                      },
                      {
                        text: "Categorical",
                        result: "Cochran's Q test",
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
    {
      text: "Predict outcomes or model relationships",
      next: {
        question: "Outcome variable type?",
        options: [
          {
            text: "Continuous",
            next: {
              question: "Number of predictors?",
              options: [
                {
                  text: "Single predictor",
                  next: {
                    question: "Relationship type?",
                    options: [
                      { text: "Linear", result: "Simple linear regression" },
                      { text: "Non-linear", result: "Non-linear regression" },
                    ],
                  },
                },
                {
                  text: "Multiple predictors",
                  next: {
                    question: "Model characteristics?",
                    options: [
                      {
                        text: "Standard linear model",
                        result: "Multiple linear regression",
                      },
                      {
                        text: "Hierarchical/mixed effects",
                        result: "Linear mixed-effects model",
                      },
                      {
                        text: "Regularization needed",
                        result: "Ridge/Lasso/Elastic Net regression",
                      },
                    ],
                  },
                },
              ],
            },
          },
          {
            text: "Categorical (binary)",
            result: "Logistic regression",
          },
          {
            text: "Categorical (multinomial)",
            result: "Multinomial logistic regression",
          },
          {
            text: "Count data",
            next: {
              question: "Overdispersion present?",
              options: [
                { text: "No", result: "Poisson regression" },
                { text: "Yes", result: "Negative binomial regression" },
              ],
            },
          },
          {
            text: "Time-to-event/survival",
            result: "Cox proportional hazards regression",
          },
          {
            text: "Ordinal categories",
            result: "Ordinal logistic regression",
          },
        ],
      },
    },
    {
      text: "Explore relationships between variables",
      next: {
        question: "Variables to analyze?",
        options: [
          {
            text: "Two continuous variables",
            next: {
              question: "Relationship type?",
              options: [
                {
                  text: "Linear",
                  next: {
                    question: "Normality assumption?",
                    options: [
                      { text: "Met", result: "Pearson correlation" },
                      {
                        text: "Not met",
                        result: "Spearman's rank correlation",
                      },
                    ],
                  },
                },
                {
                  text: "Non-linear",
                  result: "Kendall's tau or distance correlation",
                },
              ],
            },
          },
          {
            text: "Two categorical variables",
            result: "Chi-square test of independence",
          },
          {
            text: "Continuous and categorical",
            next: {
              question: "Goal?",
              options: [
                {
                  text: "Group differences",
                  result: "ANOVA/t-test equivalents",
                },
                { text: "Predict continuous", result: "ANCOVA" },
              ],
            },
          },
          {
            text: "Multivariate relationships",
            next: {
              question: "Analysis type?",
              options: [
                { text: "Dimension reduction", result: "PCA/Factor analysis" },
                { text: "Clustering", result: "Cluster analysis methods" },
                {
                  text: "Mediation analysis",
                  result: "Structural equation modeling",
                },
              ],
            },
          },
        ],
      },
    },
    {
      text: "Analyze longitudinal/repeated measures",
      next: {
        question: "Data structure?",
        options: [
          {
            text: "Fixed time points",
            result: "Repeated measures ANOVA",
          },
          {
            text: "Continuous time measurements",
            next: {
              question: "Goal?",
              options: [
                { text: "Group comparisons", result: "Mixed-effects models" },
                { text: "Growth patterns", result: "Growth curve analysis" },
              ],
            },
          },
          {
            text: "Correlated observations",
            result: "GEE (Generalized Estimating Equations)",
          },
        ],
      },
    },
    {
      text: "Assess measurement properties",
      next: {
        question: "What to evaluate?",
        options: [
          {
            text: "Reliability",
            next: {
              question: "Data type?",
              options: [
                { text: "Continuous", result: "Cronbach's alpha" },
                {
                  text: "Categorical",
                  result: "Cohen's kappa/Krippendorff's alpha",
                },
              ],
            },
          },
          {
            text: "Validity",
            next: {
              question: "Validity type?",
              options: [
                { text: "Construct", result: "Factor analysis" },
                { text: "Criterion", result: "ROC curve analysis" },
              ],
            },
          },
        ],
      },
    },
  ],
};

let history = []; // Track navigation history

function renderNode(node) {
  const questionElement = document.getElementById("question");
  const optionsElement = document.getElementById("options");
  const backButton = document.getElementById("back-button");
  const resetButton = document.getElementById("reset-button");

  // Clear previous content
  questionElement.textContent = node.question;
  optionsElement.innerHTML = "";

  // Show/hide back button based on history
  if (history.length > 0) {
    backButton.style.display = "inline-block";
  } else {
    backButton.style.display = "none";
  }

  // Render options
  node.options.forEach((option) => {
    const button = document.createElement("button");
    button.textContent = option.text;
    button.classList.add("option-button"); // Add a class for styling

    button.addEventListener("click", () => {
      if (option.result) {
        // If it's a result, display it
        questionElement.innerHTML = `<strong>Recommended Analysis:</strong><br>${option.result}`;
        optionsElement.innerHTML = "";
        history.push(node); // Save the last node before result
      } else {
        // Otherwise, move to the next node
        history.push(node); // Save current node to history
        renderNode(option.next);
      }
    });

    optionsElement.appendChild(button);
  });

  // Reset button functionality
  resetButton.onclick = () => {
    history = []; // Clear history
    renderNode(decisionTree); // Restart from the beginning
  };

  // Back button functionality
  backButton.onclick = () => {
    if (history.length > 0) {
      const previousNode = history.pop(); // Get the last node from history
      renderNode(previousNode); // Render the previous node
    }
  };
}

// Initial render
renderNode(decisionTree);
