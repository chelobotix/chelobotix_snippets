# Datatables

## Fragment 1: Basic

gem 'jquery-rails'
gem 'jquery-datatables-rails', '~> 3.4.0'
gem 'ajax-datatables-rails'
gem 'jquery-ui-rails'

https://github.com/rweng/jquery-datatables-rails

```ruby
# application.js
//= require jquery3
//= require rails-ujs
//= require jquery-ui
//= require dataTables/jquery.dataTables
//= require dataTables/extras/dataTables.scroller
//= require dataTables/dataTables.yadcf.js
//= require dataTables/dataTables.checkboxes.js

# application.scss
@import 'dataTables/jquery.dataTables';
@import 'dataTables/extras/dataTables.tableTools';
@import 'dataTables/dataTables.checkboxes.css';

# view (esta opcion solo si tiene menos de 500 rows o elementos)
Crear un table con un id especifico:
%table#users.table
  %thead
    %tr
      %th{:scope => "col"}
      %th{:scope => "col"} #
      %th{:scope => "col"} Id
      %th{:scope => "col"} Name
      %th{:scope => "col"} Age
  %tbody
    -@users.each_with_index do |user, index|
      %tr
        %td
        %th{:scope => "row"}=index + 1
        %td= user[:id]
        %td= user[:name]
        %td= user[:age]

#*********************************
# countries.js.coffee
jQuery ->
    console.log('entre');
    $('#users').dataTable({
        order: [2, 'asc'],
        columnDefs: [{
            targets: 0,
            checkboxes: {selectRow: true}
        }],
        select: {style: 'multi'},
    })
    
    
    
#**************** repintar
vTable.draw(false)





#**************** Callbacks
$('#example').DataTable({
    "initComplete": function(settings, json) {
        alert('DataTable inicializado completamente');
    }
});

$('#example').DataTable({
    "drawCallback": function(settings) {
        alert('DataTable dibujado/re-dibujado');
    }
});
```

## Fragment 2: AJAX

```ruby

//$.fn.dataTable.ext.errMode = 'none'; #disable notifications

1. rails generate datatable Movie


2. routes
concern :with_datatable do
    post 'datatable', on: :collection
  end

resources :movies, only: [:index], concerns: [:with_datatable]



3. controller
class MoviesController < ApplicationController
  def index
  end

  def datatable
    render json: MovieDatatable.new(params, view_context: view_context)
  end
end

4. clase
#application
class ApplicationDatatable < AjaxDatatablesRails::ActiveRecord

	extend Forwardable
	attr_reader :view

	def initialize(params, opts = {})
		@view = opts[:view_context]
		super
	end

end

#movies
class MovieDatatable < ApplicationDatatable

  def view_columns
    # Declare strings in this format: ModelName.column_name
    # or in aliased_join_table.column_name format
    @view_columns ||= {
      id: { source: "Movie.name" },
      name: { source: "Movie.year" }
      user: { source: "User.name" } #aca pones el nombre de la tabla que tiene relacion no pongas Movie.user.name!
    }
  end

  def data
    records.map do |record|
      {
        name: record.name,
        year: record.year
      }
    end
  end

  def get_raw_records
    Movie.all
  end

end

5. vista
%table.table.card-table.hover.w-100#movies-datatable(data-source="#{datatable_movies_path(format: :json)}")
	%thead
		%tr
			%th{:width => "100"} Name
			%th{:width => "100"} Year
	%tbody

6. coffee
$ ->
  $('#movies-datatable').dataTable
    processing: true,
    serverSide: true,
    ajax:
      url: $('#movies-datatable').data('source')
      type: 'POST'
    pagingType: 'full_numbers'
    columns: [
      {data: 'id'},
      {data: 'name'},
      {data: 'year'},
      {data: 'actions', "searchable": false, "orderable": false}
    ],
    order: [1, 'asc'],    
		columnDefs: [
			{ class: "text-center", "targets": [4, 5] }
		],
		language: {
            "zeroRecords": "No se encontraron registros coincidentes - <button id='miBoton'>Haz clic aquí</button>"
    },
    searching: true,
    responsive: true
    
Listo!!! no te olvides de lo que has sufrido. Lee la documentacion completa.

yadcf
{
    column_number: 7,
    select_type: 'select2',
    style_class: 'form-control form-control-sm',
    filter_reset_button_text: false,
    filter_default_label: 'United States of America',
    data: gon.countries,
    select_type_options: {
        allowClear: true,
    },

},




#
```


```ruby
# SEARCH

# Cuando vas a buscar lo que quieres buscar lo pones en el metodo view_columns y el ID si o si. Puedes tener otros campos pero solo esos van en ese metodo!
def view_columns
    @view_columns ||= {
      id: { source: 'Package.id' },
      store: { source: 'Store.name' },
      carrier: { source: 'Carrier.name' },
      mail_type: { source: 'MailType.name' },
    }
  end
  
# Tienes que asegurarte que el modelo de la relacion que quieres buscar esta incluido dentro de la consulta SQL con join mejor no usese include:
Package
      .left_joins(:package_inventory)
      .left_joins(:store)
      .left_joins(mail_type: :carrier)
      .where(account_id: User.current.account.id)

# y en el JS le pones asi (opcional):
searching: true,
columns: [
      {data: 'extra_id', "searchable": false, "orderable": false},
      {data: 'name', "searchable": true, "orderable": true},
      {data: 'warehouse', "searchable": true, "orderable": true},
    ],
```




