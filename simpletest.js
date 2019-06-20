
var TinyTestHelper = {
    renderStatus: function(tests, failures){
        var numberOfTests = Object.keys(tests).length;
        var successes = numberOfTests - failures;

        var summaryTotalString = 'Total test number: ' + numberOfTests;
        var summarySuccessString = 'Success number: ' + successes;
        var summaryFailureString = 'Failure number: ' + failures;

        var summaryTotalElement = document.createElement('h2');
        summaryTotalElement.textContent = summaryTotalString;
        document.body.appendChild(summaryTotalElement);

        var summarySuccessElement = document.createElement('h2')
        summarySuccessElement.textContent = summarySuccessString;
        document.body.appendChild(summarySuccessElement);

        var summaryFailureElement = document.createElement('h2')
        summaryFailureElement.textContent = summaryFailureString;
        document.body.appendChild(summaryFailureElement);
    }
}

var TinyTest = {

    run: function(tests) {
        var failures = 0;

        for (var testName in tests) {
            var testAction = tests[testName];
            try {
                testAction.apply(this);
                console.log('%c' + testName, "color: green");
            } catch (e) {
                failures++;
                console.groupCollapsed('%c' + testName, "color: red");
                console.error(e.stack);
                console.groupEnd();
            }
        }
        setTimeout(function() { // Give document a chance to complete
            if (window.document && document.body) {
                document.body.style.backgroundColor = (failures == 0 ? '#99ff99' : '#ff9999');
            }
            TinyTestHelper.renderStatus(tests, failures);
        }, 0);
    },

    fail: function(msg) {
        throw new Error('fail(): ' + msg);
    },

    assert: function(value, msg) {
        if (!value) {
            throw new Error('assert(): ' + msg);
        }
    },

    assertEquals: function(expected, actual) {
        if (expected != actual) {
            throw new Error('assertEquals() "' + expected + '" != "' + actual + '"');
        }
    },

    assertStrictEquals: function(expected, actual) {
        if (expected !== actual) {
            throw new Error('assertStrictEquals() "' + expected + '" !== "' + actual + '"');
        }
    },

};

var fail               = TinyTest.fail.bind(TinyTest),
    assert             = TinyTest.assert.bind(TinyTest),
    assertEquals       = TinyTest.assertEquals.bind(TinyTest),
    eq                 = TinyTest.assertEquals.bind(TinyTest), // alias for assertEquals
    assertStrictEquals = TinyTest.assertStrictEquals.bind(TinyTest),
    tests              = TinyTest.run.bind(TinyTest);
