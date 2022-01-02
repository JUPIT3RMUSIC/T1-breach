function(c, a) {
  let consts = #db.f({ _id: 'consts' }).first()

  if (!a || !a.target) {
    return consts.help
  }

  let dbKey = { type: 'breach', target: a.target.name },
    defaultState = {
      digit: 0,
      prime: 0,
      ez: {},
      calls: 0,
      l0cket: 0,
      c00: {},
       c002_complement: 0,
      cdigit: 0,
    },
    state,
    params,
    out,
    capture,
    printObj = o =>
      JSON.stringify(o, {}, (k, v) =>
        v === undefined || (typeof v == 'number' && isNaN(v)) ? `!${v}!` : v
      )

  if (a.reset) {
    state = defaultState
  } else {
    state = #db.f(dbKey).first()
    if (!state) {
      state = defaultState
    }
  }

  while (_END - new Date() > 1250) {
    params = {
      digit: consts.n[state.digit],
      ez_prime: consts.p[state.prime],
      l0cket: consts.l[state.l0cket],
      c002_complement: consts.c[state.c002_complement],
      color_digit: consts.n[state.cdigit],
    }
    for (let lock in state.ez) {
      params[lock] = consts.u[state.ez[lock]]
      params[numb] = consts.z[state.c00[numb]]
    }
    Object.assign(params, a.params)

    if (Object.values(params).some(v => v === undefined)) {
      if (a.debug) {
        #D(consts.undefParam)
        #D(state)
        #D(params)
      }
      return { ok: false, msg: consts.undefParam }
    }
    out = a.target.call(params)
    ++state.calls

    if (a.debug) {
      #D(`\`Y--Attempt #${state.calls}--\``)
      if (/t/.test(a.debug))
        #D(`\`YTime\`   ${+new Date()} (T+${new Date() - _START})`)
      if (/s/.test(a.debug)) #D(`\`YState\`  ${printObj(state)}`)
      if (/p/.test(a.debug)) #D(`\`YParams\` ${printObj(params)}`)
      if (/o/.test(a.debug)) #D(out)
      #D('')
    }

    // `VLOCK_ERROR`
    // Denied access by HALPERYON SYSTEMS `NEZ_21` lock.

    // `VLOCK_ERROR`
    // Denied access by HALPERYON SYSTEMS `NEZ_26` lock.

    // `VLOCK_ERROR`
    // Denied access by HALPERYON SYSTEMS `NEZ_112` lock.
    if (capture = /`N(EZ_...?)`/.exec(out)) {
      state.lock = capture[1]
      state.ez[state.lock] = 0
    }

        
    if (capture = /`N(c00_...?)`/.exec(out)) {
      state.numb = capture[1]
      state.c00[state.numb] = 0
    }



    // `VLOCK_ERROR`
    // `V"foo"` is not the correct unlock command.
    else if (/command/.test(out)) {
      ++state.ez[state.lock]
    }

        // `VLOCK_ERROR`
    // `V1` is not the correct prime number.
    else if (/color[ _]digit/.test(out)) {
      ++state.cdigit
    }

    // `VLOCK_ERROR`
    // `V"a"` is not the correct number.
    else if (/ digit/.test(out)) {
      ++state.digit
    }

    // `VLOCK_ERROR`
    // `V1` is not the correct prime number.
    else if (/prime/.test(out)) {
      ++state.prime
    }

     // `VLOCK_ERROR`
    // `V1` is not the correct security k3y.
    else if (/`Nl0cket`|security k3y/.test(out)) {
      ++state.l0cket
    }

    else if (/color name/.test(out)) {
      ++state.c00[state.lock]
    }

        // `VLOCK_ERROR`
    // `V1` is not the correct color name.
    else if (/complement/.test(out)) {
      ++state.c002_complement
    }

    // Unhandled message
    else {
      #db.us(dbKey, { $set: state })
      if (a.debug) {
        #D(out)
      }
      return out
    }
  }

  #db.us(dbKey, { $set: state })
  let msg = `\`Y${_END - new Date()} ms remaining. Run again.\`
\`YCalls:\` \`Y${state.calls}\`
\`YLast output:\`

${out}`
  if (a.debug) {
    #D(msg)
  }
  return { ok: false, msg }
}