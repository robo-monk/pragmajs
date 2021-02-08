const createTemplate = conf => _p()
    .run(function () {
        util.createChains(this, 'config')

        this.config = function(conf){
            this.configChain.exec(conf)
            return this
        }
        
        this.onConfig((conf = {}) => {
            const defaults = ['events', 'chains', 'exports', 'persistentExports']
            defaults.forEach(attr => {
                if (!conf[attr]) return
                this[`_${attr}`] = conf[attr]
                delete conf[attr]
            })

            if (this._events) util.createEventChains(this, ...(this._events))
            if (this._chains) util.createChains(this, ...(this._chains))
            
            for (let [attr, val] of Object.entries(conf)) {
                this[attr] = val
                this.export(attr)
            }
            if (this._exports) this.export(...(this._exports))

        })

        this.export('exports', 'config', 'exportChain', 'configChain', 'onConfig')
        
    }, function () {
        if (typeof conf === 'object') this.config(conf)
    })


export { createTemplate }