export default function slugify(str: string) : string {

    console.log(str)

    str = str.replace(/^\s+|\s+$/g, ''); // trim leading/trailing white space
    str = str.toLowerCase(); // convert string to lowercase
    str = str
      // .replace(/[^a-z0-9 -]/g, '') // remove any non-alphanumeric characters
      .replace(/:+/g, '-')
      .replace(/[^a-z0-9-\+: ]/g, '') // remove any non-alphanumeric characters
      .replace(/\s+/g, '-') // replace spaces with hyphens
      .replace(/-+/g, '-'); // remove consecutive hyphens
    return str;

    // console.log(str)

    // return 'Primitive Data Types in C++'
  }