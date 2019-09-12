var path = require('path');
var fs = require('fs');

module.exports = {
  'init': function(browser) {
    browser
      .url('file://' + path.join(__dirname, 'index.html'))
      .waitForElementVisible('body', 1000)
      .assert.value('input', 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAWgAAAFoCAYAAAB65WHVAAARM0lEQVR4Xu3cR6jleV4F8FOKcWFWzIhiAAMKoqALxQhiAh0d1FmMiuBKEDGLCRRREVwJBlQUQyuGjWEnGBcGzIpiAMNCwYy55Tf+G55lddebqemaew6fuxmmq+rV+X5OcXjcd+99kDz7bDwIECBA4OYEHhjom+tEIAIECLxCwED7h0CAAIEbFTDQN1qMWAQIEPh/A/3s+abagwABAgSeusCD/N8fCRrop16Bv5AAAQKPFjDQ/mUQIEDgRgUM9I0WIxYBAgQMtH8DBAgQuFGBV3qg/yvJ1yX5miT/meT3krzHCxz3N0m+KclPJPnT/30dX94pycck+cIkb/WIP/vfSb4nyfcm+Y0k/5TkzZN8QJLPSfKxN4opFgECBF6dAq/UQP9Jkpcl+YU7CV5ooH8/yYcl+askr5fk3a9R/8Prf98myc8neec7X+/fk3xckp+9/tv5tTPO5+8+Y38en5/km1+dCr4WAQIEblDg3gP9o0k+M8m/XN89f3WSf3uB76DPi0PeN8lvJvnQJN+X5O0ugD9K8glJfvca45+8A/OV19c/4/1jST7w+rXznfsZ5S+6/v8v3/m1G3QViQABAk8scO+B/sQkv57kB5J8UJLXf8xA/9w1zK+b5C+SvMVDUc93yB+d5HWS/H2SN7h+/Yz4Xyb5kSSf9Ijzzt/9S0m+PMnXPvH5vgABAgRuV+DeA/3tST45yZtetzxuoH8nyY9fw3ueknj48bd3RvvPkrxj8oqXZJ/xPb/2EXdG++6f/awk35XkC5J84+26SkaAAIEnFrj3QD/8Nz1uoB+X7A+uHy6e76D/LskbPu4PJDk/PHz/6zv570/yaff4M34LAQIEWgVeYwP9xUm+IcmnJvnBe+idHxKe55+fuZ57Pj+ofO17/Dm/hQABAq0Cr5GBPs9Pf+T1/PP5IeK7PI/e+SHhl1zPUf91kre9XkXyVddz4K3ochMgQOA+Ak99oM8PB89z2f+c5Lwy5Pzw8fke353k5Xd+8e2TfFSSL3vopXn3OdTvIUCAQJvAUx3o70jyudebVc6bUF56T63zKo/fSvKdSc5ov3GSX7leV33PL+G3ESBAoE7gqQz0eXXGef74vOriTa6X0H34q0j1eUm+NcnHX+9OfBW/jD9GgACBmxd40Qf6jPN5g8v5zve8K/CnkrzbE7D86vVKjje6npt+gi/ljxIgQOCmBV70gT6vgf6WJO+X5Kef57M3nhM6bw0/PxQ8n73xM0le6xF0v5jkg6+nSf7DKzlu+h+XcAQIPJnAizrQ5w0l540l73p9fsdbPibrPyR5syTnbd3nh4nnlR4PP74+yZdeX/N8pocHAQIEVgVetIE+7wY8T2n8Y5LzuRnnk+ju8/iU67XO73C9Pvq8tfu5x3ln4qdfnwdy3uZ93u7tQYAAgVWBew30H19vKLmL8GvXW7Pf86HXJP/Q9brm85Gk5+Vw5x2H5/e80OMrrg9POr/nfGLd+QHieX30eZyhPh+c9OdJzmuhz+O81O58wNL5hDwPAgQIrArca6B/O8l731PgvBzuva7PyrjvR4Kez/n47Dtf/1+TfFuSH74+Le88J31+KPg+ST7jem30o56fvmdEv40AAQIVAvca6IpLhCRAgMCYgIEeK9Q5BAjsCBjonS5dQoDAmICBHivUOQQI7AgY6J0uXUKAwJjAYwf6JXnmfDqoBwECBAg8ZYFn8pIPuftXPkiePR+f4UGAAAECNyZgoG+sEHEIECDwnICB9m+BAAECNypwBvq8ie/u47l3WN9oZLEIECAwK/DWDz0HPXuowwgQIFAt8KA6vfAECBAYFjDQw+U6jQCBbgED3d2f9AQIDAsY6OFynUaAQLeAge7uT3oCBIYFDPRwuU4jQKBbwEB39yc9AQLDAgZ6uFynESDQLWCgu/uTngCBYQEDPVyu0wgQ6BYw0N39SU+AwLCAgR4u12kECHQLGOju/qQnQGBYwEAPl+s0AgS6BQx0d3/SEyAwLGCgh8t1GgEC3QIGurs/6QkQGBYw0MPlOo0AgW4BA93dn/QECAwLGOjhcp1GgEC3gIHu7k96AgSGBQz0cLlOI0CgW8BAd/cnPQECwwIGerhcpxEg0C1goLv7k54AgWEBAz1crtMIEOgWMNDd/UlPgMCwgIEeLtdpBAh0Cxjo7v6kJ0BgWMBAD5frNAIEugUMdHd/0hMgMCxgoIfLdRoBAt0CBrq7P+kJEBgWMNDD5TqNAIFuAQPd3Z/0BAgMCxjo4XKdRoBAt4CB7u5PegIEhgUM9HC5TiNAoFvAQHf3Jz0BAsMCBnq4XKcRINAtYKC7+5OeAIFhAQM9XK7TCBDoFjDQ3f1JT4DAsICBHi7XaQQIdAsY6O7+pCdAYFjAQA+X6zQCBLoFDHR3f9ITIDAsYKCHy3UaAQLdAga6uz/pCRAYFjDQw+U6jQCBbgED3d2f9AQIDAsY6OFynUaAQLeAge7uT3oCBIYFDPRwuU4jQKBbwEB39yc9AQLDAgZ6uFynESDQLWCgu/uTngCBYQEDPVyu0wgQ6BYw0N39SU+AwLCAgR4u12kECHQLGOju/qQnQGBYwEAPl+s0AgS6BQx0d3/SEyAwLGCgh8t1GgEC3QIGurs/6QkQGBYw0MPlOo0AgW4BA93dn/QECAwLGOjhcp1GgEC3gIHu7k96AgSGBQz0cLlOI0CgW8BAd/cnPQECwwIGerhcpxEg0C1goLv7k54AgWEBAz1crtMIEOgWMNDd/UlPgMCwgIEeLtdpBAh0Cxjo7v6kJ0BgWMBAD5frNAIEugUMdHd/0hMgMCxgoIfLdRoBAt0CBrq7P+kJEBgWMNDD5TqNAIFuAQPd3Z/0BAgMCxjo4XKdRoBAt4CB7u5PegIEhgUM9HC5TiNAoFvAQHf3Jz0BAsMCBnq4XKcRINAtYKC7+5OeAIFhAQM9XK7TCBDoFjDQ3f1JT4DAsICBHi7XaQQIdAsY6O7+pCdAYFjAQA+X6zQCBLoFDHR3f9ITIDAsYKCHy3UaAQLdAga6uz/pCRAYFjDQw+U6jQCBbgED3d2f9AQIDAsY6OFynUaAQLeAge7uT3oCBIYFDPRwuU4jQKBbwEB39yc9AQLDAgZ6uFynESDQLWCgu/uTngCBYQEDPVyu0wgQ6BYw0N39SU+AwLCAgR4u12kECHQLGOju/qQnQGBYwEAPl+s0AgS6BQx0d3/SEyAwLGCgh8t1GgEC3QIGurs/6QkQGBYw0MPlOo0AgW4BA93dn/QECAwLGOjhcp1GgEC3gIHu7k96AgSGBQz0cLlOI0CgW8BAd/cnPQECwwIGerhcpxEg0C1goLv7k54AgWEBAz1crtMIEOgWMNDd/UlPgMCwgIEeLtdpBAh0Cxjo7v6kJ0BgWMBAD5frNAIEugUMdHd/0hMgMCxgoIfLdRoBAt0CBrq7P+kJEBgWMNDD5TqNAIFuAQPd3Z/0BAgMCxjo4XKdRoBAt4CB7u5PegIEhgUM9HC5TiNAoFvAQHf3Jz0BAsMCBnq4XKcRINAtYKC7+5OeAIFhAQM9XK7TCBDoFjDQ3f1JT4DAsICBHi7XaQQIdAsY6O7+pCdAYFjAQA+X6zQCBLoFDHR3f9ITIDAsYKCHy3UaAQLdAga6uz/pCRAYFjDQw+U6jQCBbgED3d2f9AQIDAsY6OFynUaAQLeAge7uT3oCBIYFDPRwuU4jQKBbwEB39yc9AQLDAgZ6uFynESDQLWCgu/uTngCBYQEDPVyu0wgQ6BYw0N39SU+AwLCAgR4u12kECHQLGOju/qQnQGBYwEAPl+s0AgS6BQx0d3/SEyAwLGCgh8t1GgEC3QIGurs/6QkQGBYw0MPlOo0AgW4BA93dn/QECAwLGOjhcp1GgEC3gIHu7k96AgSGBQz0cLlOI0CgW8BAd/cnPQECwwIGerhcpxEg0C1goLv7k54AgWEBAz1crtMIEOgWMNDd/UlPgMCwgIEeLtdpBAh0Cxjo7v6kJ0BgWMBAD5frNAIEugUMdHd/0hMgMCxgoIfLdRoBAt0CBrq7P+kJEBgWMNDD5TqNAIFuAQPd3Z/0BAgMCxjo4XKdRoBAt4CB7u5PegIEhgUM9HC5TiNAoFvAQHf3Jz0BAsMCBnq4XKcRINAtYKC7+5OeAIFhAQM9XK7TCBDoFjDQ3f1JT4DAsICBHi7XaQQIdAsY6O7+pCdAYFjAQA+X6zQCBLoFDHR3f9ITIDAsYKCHy3UaAQLdAga6uz/pCRAYFjDQw+U6jQCBbgED3d2f9AQIDAsY6OFynUaAQLeAge7uT3oCBIYFDPRwuU4jQKBbwEB39yc9AQLDAgZ6uFynESDQLWCgu/uTngCBYQEDPVyu0wgQ6BYw0N39SU+AwLCAgR4u12kECHQLGOju/qQnQGBYwEAPl+s0AgS6BQx0d3/SEyAwLGCgh8t1GgEC3QIGurs/6QkQGBYw0MPlOo0AgW4BA93dn/QECAwLGOjhcp1GgEC3gIHu7k96AgSGBQz0cLlOI0CgW8BAd/cnPQECwwIGerhcpxEg0C1goLv7k54AgWEBAz1crtMIEOgWMNDd/UlPgMCwgIEeLtdpBAh0Cxjo7v6kJ0BgWMBAD5frNAIEugUMdHd/0hMgMCxgoIfLdRoBAt0CBrq7P+kJEBgWMNDD5TqNAIFuAQPd3Z/0BAgMCxjo4XKdRoBAt4CB7u5PegIEhgUM9HC5TiNAoFvAQHf3Jz0BAsMCBnq4XKcRINAtYKC7+5OeAIFhAQM9XK7TCBDoFjDQ3f1JT4DAsICBHi7XaQQIdAsY6O7+pCdAYFjAQA+X6zQCBLoFDHR3f9ITIDAsYKCHy3UaAQLdAga6uz/pCRAYFjDQw+U6jQCBbgED3d2f9AQIDAsY6OFynUaAQLeAge7uT3oCBIYFDPRwuU4jQKBbwEB39yc9AQLDAgZ6uFynESDQLWCgu/uTngCBYQEDPVyu0wgQ6BYw0N39SU+AwLCAgR4u12kECHQLGOju/qQnQGBYwEAPl+s0AgS6BQx0d3/SEyAwLGCgh8t1GgEC3QIGurs/6QkQGBYw0MPlOo0AgW4BA93dn/QECAwLGOjhcp1GgEC3gIHu7k96AgSGBQz0cLlOI0CgW8BAd/cnPQECwwIGerhcpxEg0C1goLv7k54AgWEBAz1crtMIEOgWMNDd/UlPgMCwgIEeLtdpBAh0Cxjo7v6kJ0BgWMBAD5frNAIEugUMdHd/0hMgMCxgoIfLdRoBAt0CBrq7P+kJEBgWMNDD5TqNAIFuAQPd3Z/0BAgMCxjo4XKdRoBAt4CB7u5PegIEhgUM9HC5TiNAoFvAQHf3Jz0BAsMCBnq4XKcRINAtYKC7+5OeAIFhAQM9XK7TCBDoFjDQ3f1JT4DAsICBHi7XaQQIdAsY6O7+pCdAYFjAQA+X6zQCBLoFDHR3f9ITIDAsYKCHy3UaAQLdAga6uz/pCRAYFjDQw+U6jQCBbgED3d2f9AQIDAsY6OFynUaAQLeAge7uT3oCBIYFDPRwuU4jQKBbwEB39yc9AQLDAgZ6uFynESDQLWCgu/uTngCBYQEDPVyu0wgQ6BYw0N39SU+AwLCAgR4u12kECHQLGOju/qQnQGBYwEAPl+s0AgS6BQx0d3/SEyAwLGCgh8t1GgEC3QIGurs/6QkQGBYw0MPlOo0AgW4BA93dn/QECAwLGOjhcp1GgEC3gIHu7k96AgSGBQz0cLlOI0CgW8BAd/cnPQECwwIGerhcpxEg0C1goLv7k54AgWEBAz1crtMIEOgWMNDd/UlPgMCwgIEeLtdpBAh0Cxjo7v6kJ0BgWMBAD5frNAIEugUMdHd/0hMgMCxgoIfLdRoBAt0CBrq7P+kJEBgWMNDD5TqNAIFuAQPd3Z/0BAgMC/wPzIEoycQWJjMAAAAASUVORK5CYII=')
      .end();
  }
};
