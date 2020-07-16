const validIPAddress = ip => {
    var ip4 = ip.split('.');
    var ip6 = ip.split(':');
    console.log(ip4, ip6);
    if (ip4.length === 4) {
        // check the four numbers are valid
        if (ip4.some(x => x[0] === '0' && x.length > 1)) {return 'Neither'}
        if (ip4.some(x => /\D/.test(x))) {return 'Neither'}
        if (ip4.some(x => x==='')) {return 'Neither'}
        if (ip4.map(Number).some(x => x>255 || x<0)) {return 'Neither'}
        return 'IPv4'
    }
    if (ip6.length === 8) {
        if (ip6.some(x => x.length > 4 || x === '')) {return 'Neither'}
        if (ip6.some(x => /[^0-9a-f]/i.test(x))) {return 'Neither'}
        return 'IPv6'
    }
    return 'Neither'
}

const tests = [
    {in: '172.16.1', out:'Neither' }, // Not enough numbersx
    {in: '1.0.1.', out:'Neither' }, // Not enough numbersx
    {in: '172.16.254.01', out:'Neither' }, // leading zero
    {in: '172.16.254.1', out:'IPv4' },
    {in: '172.16A.254.1', out:'Neither' }, // non-digit included
    {in: '172.16.256.1', out:'Neither' }, // number above 255
    {in: '2001:0db8:85a3:0000:0000:8a2e:0370:7334', out:'IPv6' }, 
    {in: '2001:db8:85a3:0:0:8A2E:0370:7334', out:'IPv6' }, // even without leading zeros, or uppercase characters
    {in: '2001:db8:85a3:0:0H:8A2E:0370:7334', out:'IPv6' }, // non hex-digit
    {in: '2001:0db8:85a3::0:8A2E:0370:7334', out:'Neither' }, // zeros need to be present, not just inferred
    {in: '02001:0db8:85a3:0:0:8A2E:0370:7334', out:'Neither' }, // leading zero makes a five digit number
    {in: '2001:0db8:85a3:0:8A2E:0370:7334', out:'Neither' } // only 7 numbers
];

tests.forEach((t, i) => console.log('test', i, '::', validIPAddress(t.in)))