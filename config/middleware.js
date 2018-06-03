var middleware = {
    isLoggedIn: function (req, res, next) {
        
        // if user is authenticated in the session, carry on
        if (req.isAuthenticated())
            return next();
    
        // if they aren't redirect them to the home page
        res.redirect('/login');
    },
    isLoggedInAdmin: function (req, res, next) {
        
        // if user is authenticated in the session, carry on
        if (req.isAuthenticated())
            return next();
    
        // if they aren't redirect them to the home page
        res.redirect('/admin');
    },
    Logged: function (req, res, next) {
        
        // if user isnt authenticated in the session, carry on
        if (!req.isAuthenticated())
            return next();
    
        // if they are redirect them to the home page
        res.redirect('/');
    },
    
    LoggedAdmin: function (req, res, next) {
    
        // if user isnt authenticated in the session, carry on
        if (!req.isAuthenticated())
            return next();
    
        // if they are redirect them to the home page
        res.redirect('/admin/dashboard');
    },
    
    isAdminAccess: function (req, res, next) {
    
        // if user isnt authenticated in the session, carry on
        if (req.isAuthenticated())
        {
            if (req.user.role_id == 1)
                return res.redirect('/admin/dashboard');
                
        }
        return next();
    },
    isSysAdminAccess: function (req, res, next) {
        
        // if user isnt authenticated in the session, carry on
        if (req.isAuthenticated())
        {
            if (req.user.role_id != 4)
                return res.redirect('/admin/dashboard');
                
        }
        return next();
    },
    isSysAndAdminAccess: function (req, res, next) {
        
            // if user isnt authenticated in the session, carry on
            if (req.isAuthenticated())
            {
                if (req.user.role_id == 1 || req.user.role_id == 2)
                    return res.redirect('/admin/dashboard');
                    
            }
            return next();
        }
};

module.exports = middleware;
    
    