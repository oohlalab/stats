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
  ],
};

let history = [];

function transitionTo(callback) {
  const questionElement = document.getElementById("question");
  const optionsElement = document.getElementById("options");

  // Fade out current content
  questionElement.style.opacity = "0";
  optionsElement.style.opacity = "0";

  setTimeout(() => {
    callback(); // Update content
    // Fade in new content
    questionElement.style.opacity = "1";
    optionsElement.style.opacity = "1";
  }, 300);
}

function renderNode(node) {
  const questionElement = document.getElementById("question");
  const optionsElement = document.getElementById("options");
  const backButton = document.getElementById("back-button");
  const resetButton = document.getElementById("reset-button");

  questionElement.textContent = node.question;
  optionsElement.innerHTML = ""; // Clear previous options

  backButton.style.display = history.length > 0 ? "inline-block" : "none";

  node.options.forEach((option) => {
    const button = document.createElement("button");
    button.textContent = option.text;
    button.className = "option-button";

    button.addEventListener("click", () => {
      transitionTo(() => {
        if (option.result) {
          questionElement.innerHTML = `<div class="result-box"><strong>Recommended Analysis:</strong><br>${option.result}</div>`;
          optionsElement.innerHTML = "";
          history.push(node);
        } else {
          history.push(node);
          renderNode(option.next);
        }
      });
    });

    optionsElement.appendChild(button);
  });

  resetButton.onclick = () => {
    transitionTo(() => {
      history = [];
      renderNode(decisionTree);
    });
  };

  backButton.onclick = () => {
    if (history.length > 0) {
      transitionTo(() => {
        const previousNode = history.pop();
        renderNode(previousNode);
      });
    }
  };
}

// Initial render
renderNode(decisionTree);
