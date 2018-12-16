/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */

    //The RSS Feeds suite that tests the feeds
    describe('RSS Feeds', function() {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty.
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        /* Atest that loops through each feed
         * in the allFeeds objec ensures that it has a URL defined
         * and that the URL is not empty.
         */
        it('url is defined', function () {
            for(let feed of allFeeds) {
               expect(feed.url).toBeDefined();
               expect(feed.url.length).not.toBe(0);
            }
        });

        /* A test that loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */

        it('name is defined', function (){
            for (let feed of allFeeds){
                expect(feed.name).toBeDefined();
                expect(feed.name.length).not.toBe(0);
            }
        });
    });


    /* TODO: Write a new test suite named "The menu" */
        let body = $('body');
         describe('The Menu', function(){
        
        })
        /* A test that ensures the menu element is
         * hidden by default. 
         */
        it('menu is hidden', function () {
           
            expect(body.hasClass('menu-hidden')).toBe(true);
        });
         /* A test that ensures the menu changes
          * visibility when the menu icon is clicked. This test
          * should have two expectations: does the menu display when
          * clicked and does it hide when clicked again.
          */
         it('toggling on the event', function () {
            let menu = $('.menu-icon-link');
            //call the menu-icon-link class
            menu.click();
            expect(body.hasClass('menu-hidden')).toBe(false);
            menu.click();
            expect(body.hasClass('menu-hidden')).toBe(true);
        });
    /*A test suite named "Initial Entries" */

        /*A test that ensures that when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         */
         describe('Initial Entries', function () {
        //Let call Jasmine's asynchronous functions beforeEach() and done()
        // to do an asynchronous request
            beforeEach(function (done){
                loadFeed(0, done);
            });
        // Check if the loadFeed funtion at least a single .entry element within the container
            it('ensure that when the work is complete, there is at least a single entry', function () {
                expect($('.feed .entry').length).toBeGreaterThan(0);
            });
         });
    /* A new test suite named "New Feed Selection" */

        /* A test that ensures that when a new feed is loaded
         * by the loadFeed function that the content 
         * actually changes.
         */
         // A new test suite New Feed Selection 
        describe('New Feed Selection', function() {
           let firstFeed, secondFeed;
            
            // Ensures that the new feed is loaded by the loadFunction
            beforeEach(function(done) {
                loadFeed(1, function() {
    
                    // Checks if the first feed is loaded
                    console.log('First feed is loaded!')
    
                    // Loads the first feed and checks
                    firstFeed = $('.feed').html();
                    loadFeed(2, function() {
    
                        // Checks if second feed is loaded
                        console.log('Second feed is loaded!')
                        done();
                    });
                });        
             });
            
            afterEach(function() {
                loadFeed(0);
            });
    
            // Check if two entries are not equal
            it('checks if two feeds are different', function() {
    
                // Checks second feed
                secondFeed = $('.feed').html();
                expect(firstFeed).not.toEqual(secondFeed);
            }); 
        });
}());

