import und from 'underscore'

exports.customer ={
    name: 'Francisca Bill',
    email: 'fbill@samuraibs.com',
    password: 'pwd123',
    is_provider: false
}

exports.provider = {
    name: 'Julius Dantas Barbeiro',
    email: 'jdb@samuraibs.com',
    password: 'pwd123',
    is_provider: true
}

exports.appointment = {
    // hour: '16:00'
    hour: und.sample(['08:00','09:00','10:00','14:00','15:00','16:00'])
}

