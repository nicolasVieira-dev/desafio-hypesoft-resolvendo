namespace Hypesoft.Domain.Entities;


    public class Category{

        public string Id {get; private set;} = default!;
        public string Name {get; private set;} = default!;

        private Category() {}

        public Category(string id, string name)
        {
            Id = id.Trim();
            Name = name.Trim();
        }

        public void Rename(string name) => Name = name.Trim();
    }