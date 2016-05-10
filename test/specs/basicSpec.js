describe('Basic', function() {
	it('should run', function() {
		browser.ignoreSynchronization = true;
		browser.get('http://localhost:3000/api/things');

		element(by.tagName('body')).getText().then(function(pageBody) {
			expect(JSON.parse(pageBody)).toEqual([{
				'text': 'Zip2',
				'id': '1'
			}, {
				'text': 'X.com',
				'id': '2'
			}, {
				'text': 'SpaceX',
				'id': '3'
			}, {
				'text': 'Solar City',
				'id': '4'
			}, {
				'text': 'Hyperloop',
				'id': '5'
			}]);
		});
	});
});
