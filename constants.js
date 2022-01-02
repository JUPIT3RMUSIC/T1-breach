function() {
  #db.us(
    { _id: 'consts' },
    {
      _id: 'consts',
      u: ['unlock', 'open', 'release'],
      z: [0,1,2,3],
      n: [0,1,2,3,4,5,6,7,8,9],
      q: [0,1,2,3,4,5,6,7,8,9],
      p: [2,3,5,7,11,13,17,19,23,29,31,37,41,43,47,53,59,61,67,71,73,79,83,89,97],
      l: ['6hh8xw','cmppiq','sa23uw','tvfkyq','uphlaw','vc2c7q','xwz7ja'],
      c: ['red','orange','yellow','green','lime','blue','cyan','purple'],
      y: ['red', 'orange', 'yellow', 'green', 'lime', 'blue', 'cyan', 'purple'],
      help: `\`YUsage:\`
  \`Abreach { target: #s.target.loc }\`

\`YOptions:\`
  reset: true      \`YResets the solve for this loc, in case locks have rotated\`
  \`Nparams\`: \`V{...}\`    \`YManually specifies parameters to pass to the loc\`
  debug: "flags"   \`YDisplays extra output for debugging\`
         \`V"t"\`       \`Y- Displays timing information\`
         \`V"s"\`       \`Y- Displays the internal state of the solution for this target\`
         \`V"p"\`       \`Y- Displays parameters passed to the target\`
         \`V"o"\`       \`Y- Displays the target output\``,
      undefParam: `\`YAn undefined value was found in params.\`
\`YThis could indicate locks rotating. Try running this script again with reset: true.\`
\`YIf this error persists, there is probably a bug in the script.\``
    }
  )
  return { ok: true }
}