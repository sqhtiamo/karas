let path = require('path');
let fs = require('fs');

module.exports = {
  'init': function(browser) {
    browser
      .url('file://' + path.join(__dirname, 'index.html'))
      .waitForElementVisible('body', 1000)
      .assert.value('input', 'data:image/png;base64,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jsdwowoo6FHFvD5ZQEEnp2O2kQUU9Mhk/kCwgIIODsdoowv81YJesmRJe+qpp9qqVatG/+ZX+RM+B33DKMu9kYIuF/mwF1bQw8632nYKulriA99XQQ884GLrKehigQ993WsV9NmzZ9vOnTvb0aNH24ULF9rtt9/eHn/88bZ8+fIJlu4RxxNPPNF++umntm/fvvbzzz+3+++/v23atKndcsst/evOnDnTduzY0b766qt20003te5fcb/44ov9+/3Rl0ccQ7+6ydtPQU+erXf+BwSuVdDr1q1r3377bXv11Vfbbbfd1o4dO9a2bt3atm3b1hYvXtxP2xX09OnT+/9eunRp++6779rrr7/eHnjggfbmm2+2X375pT3zzDPt5ptvbs8//3z/61tvvdUuXbrUPv300zZ16tTfba2g/4FDGMi3VNADCdIa/xW4VkGfPn26L9BZs2ZNcD399NPtnnvuaevXr58o6NmzZ7ePP/544jXvvvtu++STT9rhw4fb8ePH29q1a9vu3bvbvHnz+td888037aOPPmovvfTSH/4UraBd558VUNB/Vs6fixS4VkF3jya64h0bG2vnzp1r4+Pj7fz58+2hhx7qf5L+9SfoRx99tH9k8evXF1980ZdvV8pffvll++CDD9qRI0eue38Ffd1UXvgbAQXtJAYlcLWC7h5NrFixol2+fLm9/PLL7c477+yfH3e/736i/t+C7p5Jr169esKle2b93HPPtV27drVDhw61vXv3tgMHDly3m4K+biovVNBuYMgCVyvo7nnzs88+295///123333TRA89thj7e677/6/gu7+3wsvvDDxms8//7wv8u4n6O4vBt97773+1ylTru/nGwU95Iub3N2u78ImdwbvTuCGCVytoL/++uv+2fFnn33W5syZ03+/EydOtJUrV7aHH364vfHGGxOPOLqfrj/88MOJmbpC7p5BHzx4cOIZdPfM+d577+1fc+rUqbZ58+a2ZcuWNnfu3N/toqBvWLzl3khBl4t82AtfraC7Z87ds+Xukxlr1qxpJ0+ebO+8807/0bnu43fd72+99db+UxzTpk1ry5Yta4888kj/KY6NGzf2n+J47bXX+ufWTz75ZLty5Ur/XLr7xMfbb7/dLl682H+Ko/tUx2+/FPSwb24yt1PQk6nrvf92gWv9JeH+/ftb94mMH3/8sd11113t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')
      .end();
  }
};